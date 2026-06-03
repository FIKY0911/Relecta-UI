import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { Package, Calendar, MapPin, ChevronRight, Truck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button/Button';

// Mapping ongkos transportasi sesuai dengan spesifikasi di OrderPage
const transportCosts = {
  'Motor': 10000,
  'Mobil Pickup': 25000,
  'Truk': 40000,
  'Gerobak': 7000,
};

// Mapping style status untuk mempermudah maintenance & readability
const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
};

export const OrderHistoryPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  
  // Mengambil order milik user yang sedang login
  const orders = useOrderStore((state) => state.orders)
    .filter((order) => order.userId === currentUser?.id);

  return (
    <DashboardTemplate title="Riwayat Pesanan">
      <div className="max-w-4xl mx-auto">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              // Menghitung grand total secara presisi (Estimasi Barang + Ongkos Kendaraan)
              const transportCost = transportCosts[order.transportMode] || 0;
              const grandTotal = order.totalEstimate + transportCost;

              return (
                <Link key={order.id} to={`/history/${order.id}`} className="block group">
                  <Card className="hover:border-cobalt transition-all cursor-pointer border border-hairline-soft shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Bagian Kiri: Info Utama & Metadata */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-cobalt/[0.08] group-hover:text-cobalt transition-all">
                          <Package size={24} />
                        </div>
                        <div>
                          {/* ID & Status Badge */}
                          <div className="flex items-center gap-3 mb-2">
                            <Typography variant="body" className="font-bold text-ink-deep">
                              #{order.id}
                            </Typography>
                            <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              statusStyles[order.status] || 'bg-slate-100 text-slate-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>

                          {/* Metadata Grid (Menggunakan data baru dari OrderPage) */}
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500">
                            <div className="flex items-center gap-1.5 text-xs">
                              <Calendar size={14} />
                              Selesai Dibuat: {new Date(order.createdAt).toLocaleDateString('id-ID')}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <MapPin size={14} />
                              Penjemputan: {new Date(order.pickupDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                              <Truck size={12} className="text-slate-400" />
                              <span className="font-medium text-slate-600">{order.transportMode}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                              <AlertTriangle size={12} className="text-slate-400" />
                              <span className="font-medium text-slate-600">Kerusakan: {order.damageSeverity}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bagian Kanan: Total Bayar & Navigasi */}
                      <div className="flex items-center justify-between md:text-right border-t border-hairline-soft md:border-t-0 pt-4 md:pt-0">
                        <div className="md:mr-6">
                          <Typography variant="caption" className="text-slate-400 uppercase font-bold tracking-wider block mb-1">
                            Total Bayar
                          </Typography>
                          <Typography variant="body" className="font-bold text-xl text-cobalt">
                            Rp{grandTotal.toLocaleString('id-ID')}
                          </Typography>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-cobalt transition-all group-hover:translate-x-1" />
                      </div>

                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          /* State Ketika Kosong */
          <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-hairline-soft">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
              <Package size={32} />
            </div>
            <Typography variant="body" className="text-slate-500 mb-6">Belum ada riwayat pesanan.</Typography>
            <Link to="/order">
              <Button variant="buy">Mulai Pesanan Pertama</Button>
            </Link>
          </Card>
        )}
      </div>
    </DashboardTemplate>
  );
};
