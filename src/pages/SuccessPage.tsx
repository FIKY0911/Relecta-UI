import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { Button } from '../components/atoms/Button/Button';
import { useOrderStore } from '../stores/orderStore';
import { CheckCircle2, ArrowRight, Package, Truck, AlertTriangle, Wallet, QrCode } from 'lucide-react';
import { useMemo } from 'react';

// Mapping ongkos transportasi standar industri agar konsisten di seluruh halaman
const transportCosts = {
  'Motor': 10000,
  'Mobil Pickup': 25000,
  'Truk': 40000,
  'Gerobak': 7000,
};

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orders = useOrderStore((state) => state.orders);
  
  // Cari order berdasarkan id dari URL query params
  const order = orders.find((o) => o.id === orderId);

  // Kalkulasi biaya transportasi secara aman (Defensive Approach)
  const transportCost = useMemo(
    () => (order ? transportCosts[order.transportMode] || 0 : 0),
    [order]
  );

  // Kalkulasi total bayar akhir secara aman
  const grandTotal = useMemo(
    () => (order ? order.totalEstimate + transportCost : 0),
    [order, transportCost]
  );

  // Jika data order tidak ditemukan, lakukan early redirect untuk mencegah crash halaman bawah
  if (!order) return <Navigate to="/dashboard" />;

  return (
    <DashboardTemplate title="Pesanan Berhasil">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Bagian Animasi Berhasil */}
        <div className="mb-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-green-700 mb-6 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <Typography variant="h2" className="mb-2">Pesanan Diterima!</Typography>
          <Typography variant="body" className="text-slate-500">
            Terima kasih telah berkontribusi menjaga lingkungan. 
            Pesanan Anda telah kami catat dan akan segera diproses.
          </Typography>
        </div>

        {/* Ringkasan Invoice Card */}
        <Card className="mb-10 text-left border border-hairline-soft shadow-md">
          
          {/* Header Card: ID & Jadwal */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-hairline-soft">
            <div>
              <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider">Nomor Pesanan</Typography>
              <Typography variant="h3" className="text-ink-deep font-bold">#{order.id}</Typography>
            </div>
            <div className="text-right">
              <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider">Jadwal Penjemputan</Typography>
              <Typography variant="body" className="font-bold text-ink-deep">
                {new Date(order.pickupDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}
              </Typography>
            </div>
          </div>

          {/* Isi Pesanan */}
          <div className="space-y-4 mb-8">
            <Typography variant="body" className="font-bold text-ink-deep">Ringkasan Barang</Typography>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span className="text-slate-600">{item.typeName} x{item.quantity}</span>
                <span className="font-bold text-ink-deep">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}

            {/* Total Breakdown Finansial */}
            <div className="pt-4 border-t border-hairline-soft space-y-3">
              <div className="flex justify-between items-center">
                <Typography variant="body" className="font-bold text-slate-600">Total Estimasi Elektronik</Typography>
                <Typography variant="body" className="font-bold text-ink-deep">Rp{order.totalEstimate.toLocaleString('id-ID')}</Typography>
              </div>
              
              {/* Tampilkan data Mode Angkut & Ongkos penjemputan secara reaktif */}
              <div className="flex justify-between text-sm text-slate-600 items-center">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-slate-400" />
                  Biaya Pengangkutan ({order.transportMode || 'N/A'})
                </span>
                <span className="font-semibold text-ink-deep">Rp{transportCost.toLocaleString('id-ID')}</span>
              </div>

              {/* Tampilkan data Tingkat Kerusakan */}
              <div className="flex justify-between text-sm text-slate-600 items-center">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-slate-400" />
                  Tingkat Kerusakan
                </span>
                <span className="font-semibold text-ink-deep uppercase text-xs bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {order.damageSeverity || 'Tidak Spesifik'}
                </span>
              </div>

              {/* Tampilkan Metode Pembayaran */}
              {order.paymentMethod && (
                <div className="flex justify-between text-sm text-slate-600 items-center">
                  <span className="flex items-center gap-1.5">
                    {order.paymentMethod === 'qris'
                      ? <QrCode size={14} className="text-slate-400" />
                      : <Wallet size={14} className="text-slate-400" />}
                    Metode Pembayaran
                  </span>
                  <span className="font-semibold text-ink-deep uppercase text-xs bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {order.paymentMethod}
                  </span>
                </div>
              )}

              {/* Garis batas pembayaran total akhir */}
              <div className="flex justify-between items-center text-sm font-bold pt-4 border-t-2 border-slate-200">
                <span className="text-base text-ink-deep">Total Bayar</span>
                <Typography variant="h3" className="text-cobalt font-bold">
                  Rp{grandTotal.toLocaleString('id-ID')}
                </Typography>
              </div>
            </div>
          </div>

          {/* Edukasi Penjemputan */}
          <div className="bg-secondary/10 p-4 rounded-xl flex gap-4 items-start border border-secondary/20">
            <div className="p-2 bg-white rounded-lg text-primary shadow-sm flex-shrink-0">
              <Package size={20} />
            </div>
            <Typography variant="caption" className="text-ink-deep leading-relaxed">
              Pastikan barang elektronik Anda sudah dikemas dengan rapi dan diletakkan di area yang mudah dijangkau oleh kurir kami pada tanggal penjemputan.
            </Typography>
          </div>
        </Card>

        {/* Tombol Aksi Bawah */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/dashboard" className="flex-grow">
            <Button variant="buy" className="w-full flex items-center justify-center gap-2 py-3">
              Kembali ke Dashboard
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/history" className="flex-grow">
            <Button variant="secondary" className="w-full py-3">Lihat Riwayat</Button>
          </Link>
        </div>

      </div>
    </DashboardTemplate>
  );
};
