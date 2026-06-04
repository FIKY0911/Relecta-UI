import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { Button } from '../components/atoms/Button/Button';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { useAddressStore } from '../stores/addressStore';
import { Package, Calendar, MapPin, CheckCircle2, Truck, AlertTriangle } from 'lucide-react';

// Mapping ongkos transportasi sesuai spesifikasi industri di OrderPage
const transportCosts = {
  'Motor': 10000,
  'Mobil Pickup': 25000,
  'Truk': 40000,
  'Gerobak': 7000,
};

// Mapping warna status badge
const statusColors: Record<string, string> = {
  pending: 'text-amber-700 bg-amber-50 border-amber-200',
  completed: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  cancelled: 'text-rose-700 bg-rose-50 border-rose-200',
};

export const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const currentUser = useAuthStore((state) => state.currentUser);
  const orders = useOrderStore((state) => state.orders);
  const addresses = useAddressStore((state) => state.addresses);

  // Mengambil data order yang spesifik milik user
  const order = useMemo(
    () => orders.find((o) => o.id === orderId && o.userId === currentUser?.id),
    [orders, orderId, currentUser?.id]
  );

  // Mengambil data alamat lengkap berdasarkan addressId yang tercatat di order
  const selectedAddress = useMemo(
    () => addresses.find((addr) => addr.id === order?.addressId),
    [addresses, order?.addressId]
  );

  // Mengambil biaya pengangkutan berdasarkan mode angkut yang tersimpan
  const transportCost = useMemo(
    () => (order ? transportCosts[order.transportMode] || 0 : 0),
    [order]
  );

  // Menghitung grand total pembayaran akhir
  const grandTotal = useMemo(
    () => (order ? order.totalEstimate + transportCost : 0),
    [order, transportCost]
  );

  const formattedCreatedAt = order
    ? new Date(order.createdAt).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const formattedPickupDate = order
    ? new Date(order.pickupDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  // Early return jika pesanan tidak ditemukan
  if (!order) {
    return (
      <DashboardTemplate title="Detail Pesanan">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center py-24 border-2 border-dashed border-hairline-soft">
            <Typography variant="h3" className="mb-4 text-ink-deep">Pesanan tidak ditemukan</Typography>
            <Typography variant="body" className="text-slate-500 mb-8">
              Pesanan yang Anda pilih tidak tersedia atau sudah tidak lagi dapat ditampilkan.
            </Typography>
            <Button variant="secondary" onClick={() => navigate('/history')}>
              Kembali ke Riwayat Pesanan
            </Button>
          </Card>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate title="Detail Pesanan">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Atas: Info Utama Status */}
        <Card className="border-cobalt/20 bg-cobalt/[0.02] p-6 border-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography variant="h3" className="font-bold text-ink-deep">#{order.id}</Typography>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} />
                  Dibuat: {formattedCreatedAt}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  Jadwal Penjemputan: {formattedPickupDate}
                </span>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold shadow-sm ${
              statusColors[order.status] || 'text-slate-700 bg-slate-50 border-slate-200'
            }`}>
              <CheckCircle2 size={16} className="text-current" />
              <span className="uppercase tracking-wider text-xs">{order.status}</span>
            </div>
          </div>
        </Card>

        {/* Layout Grid Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Rincian Barang & Rincian Biaya */}
          <Card className="lg:col-span-2 space-y-6 border border-hairline-soft">
            <Typography variant="h3" className="font-bold text-ink-deep">Isi Pesanan</Typography>
            
            {/* Daftar Item */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.typeId} className="rounded-3xl border border-hairline-soft bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Typography variant="body" className="font-bold text-ink-deep">{item.typeName}</Typography>
                      <Typography variant="caption" className="text-slate-500">{item.quantity} unit</Typography>
                    </div>
                    <Typography variant="body" className="font-bold text-ink-deep">Rp{item.price.toLocaleString('id-ID')}</Typography>
                  </div>
                  <div className="mt-3 flex justify-between text-slate-500 text-xs pt-2 border-t border-slate-50">
                    <span>Subtotal</span>
                    <span>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown Rincian Pembayaran Akhir */}
            <div className="rounded-3xl border border-hairline-soft bg-slate-50/50 p-6 space-y-4">
              <div className="flex items-center justify-between text-slate-600 text-sm">
                <span>Total Estimasi Elektronik</span>
                <span className="font-bold text-ink-deep">Rp{order.totalEstimate.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 text-sm">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-slate-400" />
                  Biaya Pengangkutan ({order.transportMode})
                </span>
                <span className="font-bold text-ink-deep">Rp{transportCost.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 text-sm border-t border-dashed border-slate-200 pt-3">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-slate-400" />
                  Tingkat Kerusakan Barang
                </span>
                <span className="font-bold text-ink-deep">{order.damageSeverity}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold pt-4 border-t-2 border-slate-200">
                <span className="text-base text-ink-deep">Total Bayar</span>
                <span className="text-xl font-bold text-cobalt">Rp{grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </Card>

          {/* Kolom Kanan: Alamat & Informasi Tambahan */}
          <div className="space-y-6">
            <Card className="space-y-4 border border-hairline-soft">
              <Typography variant="h3" className="font-bold text-ink-deep">Alamat Penjemputan</Typography>
              {selectedAddress ? (
                <div className="rounded-3xl border border-hairline-soft bg-white p-4 shadow-sm">
                  <Typography variant="body" className="font-bold text-ink-deep">{selectedAddress.label}</Typography>
                  <Typography variant="caption" className="text-slate-500 block mt-0.5">
                    {selectedAddress.fullName} • {selectedAddress.phoneNumber}
                  </Typography>
                  <Typography variant="body" className="text-sm text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-50">
                    {selectedAddress.fullAddress}
                  </Typography>
                </div>
              ) : (
                <Typography variant="body" className="text-slate-500 text-sm italic">
                  Alamat penjemputan tidak dapat dimuat atau telah dihapus.
                </Typography>
              )}
            </Card>

            <Card className="space-y-4 border border-hairline-soft bg-slate-50/50">
              <Typography variant="h3" className="font-bold text-ink-deep">Informasi Penjemputan</Typography>
              <div className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                <Package size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Semua unit barang elektronik akan diangkut menggunakan armada yang telah Anda pilih.</span>
              </div>
              <div className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                <Calendar size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Kurir penjemputan akan datang sesuai tanggal pilihan pada rentang jendela operasional pukul 09:00 - 17:00 WIB.</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Aksi Navigasi Bawah */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button variant="secondary" onClick={() => navigate('/history')} className="px-6">
            Kembali ke Riwayat Pesanan
          </Button>
          <Link to="/order" className="w-full sm:w-auto">
            <Button variant="buy" className="w-full sm:w-auto px-6">
              Buat Pesanan Baru
            </Button>
          </Link>
        </div>
      </div>
    </DashboardTemplate>
  );
};
