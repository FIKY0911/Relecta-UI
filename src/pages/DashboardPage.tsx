import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { Button } from '../components/atoms/Button/Button';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore } from '../stores/orderStore';
import { useAddressStore } from '../stores/addressStore';
import { Link } from 'react-router-dom';
import { Plus, Package, MapPin, ArrowRight } from 'lucide-react';

export const DashboardPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const orders = useOrderStore((state) => state.orders).filter(o => o.userId === currentUser?.id);
  const allAddresses = useAddressStore((state) => state.addresses);
  const addresses = allAddresses.filter((address) => address.userId === currentUser?.id);

  const stats = [
    { label: 'Total Pesanan', value: orders.length, icon: Package, color: 'text-emerald-600 bg-emerald-600/10' },
    { label: 'Alamat Tersimpan', value: addresses.length, icon: MapPin, color: 'text-violet-600 bg-violet-600/10' },
  ];

  return (
    <DashboardTemplate title={`Halo, ${currentUser?.fullName?.split(' ')[0]}!`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-6">
            <div className={`p-4 rounded-xxl ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <Typography variant="body" className="text-slate-500 mb-1">{stat.label}</Typography>
              <Typography variant="h3">{stat.value}</Typography>
            </div>
          </Card>
        ))}

        <Link to="/order">
          <div className="flex items-center justify-between bg-emerald-600 text-white group cursor-pointer hover:bg-emerald-700 transition-all rounded-2xl border border-emerald-600 shadow-lg shadow-emerald-600/30 p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-all">
                <Plus size={28} />
              </div>
              <div>
                <Typography variant="body" className="text-white/70 mb-1">Cepat</Typography>
                <Typography variant="h3" className="text-white">Pesan Antar</Typography>
              </div>
            </div>
            <ArrowRight size={24} className="text-white/40 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Aktivitas Terakhir</Typography>
            <Link to="/history" className="text-sm font-bold text-emerald-600 hover:underline">Lihat Semua</Link>
          </div>

          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <Card key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-100">
                      <Package size={20} className="text-slate-600" />
                    </div>
                    <div>
                      <Typography variant="body" className="font-bold">Pesanan #{order.id}</Typography>
                      <Typography variant="caption" className="text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} Barang
                      </Typography>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                    {order.status}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed border-2">
                <Typography variant="body" className="text-slate-500 mb-4">Belum ada aktivitas pesanan.</Typography>
                <Link to="/order">
                  <Button variant="buy">Pesan Sekarang</Button>
                </Link>
              </Card>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3">Bank Sampah Terdekat</Typography>
            <Link to="/maps" className="text-sm font-bold text-emerald-600 hover:underline">Lihat Peta</Link>
          </div>

          <Card className="p-0 overflow-hidden border border-slate-100 shadow-md group">
            <div className="h-48 bg-slate-50 relative flex items-center justify-center overflow-hidden">
              {/* Decorative Grid Background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

              {/* Pulsing Pin Marker */}
              <div className="relative z-10 flex flex-col items-center transform group-hover:scale-110 transition-transform duration-500">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                  <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-emerald-600 text-white shadow-lg">
                    <MapPin size={20} />
                  </div>
                </div>
                <div className="w-4 h-1 bg-black/20 rounded-[100%] mt-2 blur-[1px]"></div>
              </div>
            </div>
            <div className="p-6">
              <Typography variant="body" className="font-bold mb-1">Bank Sampah Induk Jakarta Pusat</Typography>
              <Typography variant="caption" className="text-slate-500 mb-4">Jl. Rawasari Selatan No.1, Cempaka Putih</Typography>
              <Link to="/maps">
                <Button variant="secondary" className="w-full">Lihat Rute</Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </DashboardTemplate>
  );
};
