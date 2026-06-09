import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { Package, Calendar, MapPin, ChevronRight, Truck, AlertTriangle, Wallet, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button/Button';

// Mapping ongkos transportasi sesuai dengan spesifikasi di OrderPage
const transportCosts: Record<string, number> = {
  'Motor': 0,
  'Mobil Pickup': 0,
  'Truk': 0,
  'Gerobak': 0,
};

const paymentLabels: Record<string, { label: string; color: string }> = {
  gopay:  { label: 'GoPay',  color: 'bg-green-100 text-green-800 border-green-200' },
  ovo:    { label: 'OVO',    color: 'bg-purple-100 text-purple-800 border-purple-200' },
  dana:   { label: 'DANA',   color: 'bg-blue-100 text-blue-800 border-blue-200' },
  qris:   { label: 'QRIS',   color: 'bg-slate-100 text-slate-800 border-slate-200' },
};

// Mapping style status untuk mempermudah maintenance & readability
const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
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
                  <Card className="hover:border-emerald-500 transition-all cursor-pointer border border-slate-100 shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Bagian Kiri: Info Utama & Metadata */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                          <Package size={24} />
                        </div>
                        <div>
                          {/* ID & Status Badge */}
                          <div className="flex items-center gap-3 mb-2">
                            <Typography variant="body" className="font-bold text-slate-900">
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
                            {order.paymentMethod && (
                              <div className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md border font-bold ${
                                paymentLabels[order.paymentMethod]?.color || 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {order.paymentMethod === 'qris'
                                  ? <QrCode size={11} />
                                  : <Wallet size={11} />}
                                {paymentLabels[order.paymentMethod]?.label || order.paymentMethod.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bagian Kanan: Total Bayar & Navigasi */}
                      <div className="flex items-center justify-between md:text-right border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                        <div className="md:mr-6">
                          <Typography variant="caption" className="text-slate-400 uppercase font-bold tracking-wider block mb-1">
                            Total Bayar
                          </Typography>
                          <Typography variant="body" className="font-bold text-xl text-emerald-600">
                            Rp{grandTotal.toLocaleString('id-ID')}
                          </Typography>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-all group-hover:translate-x-1" />
                      </div>

                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          /* State Ketika Kosong */
          <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-slate-100">
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
