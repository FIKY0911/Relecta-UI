import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { Button } from '../components/atoms/Button/Button';
import { electronicTypes } from '../data/electronics';
import { useAddressStore } from '../stores/addressStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { 
  Package, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Check, 
  Minus, 
  Plus,
  Laptop,
  Smartphone,
  Tv,
  Printer,
  Refrigerator,
  Monitor,
} from 'lucide-react';

const itemWeights = {
  laptop: 3,
  smartphone: 1,
  tv: 10,
  printer: 5,
  refrigerator: 25,
  monitor: 6,
};

const iconMap = {
  laptop: Laptop,
  smartphone: Smartphone,
  tv: Tv,
  printer: Printer,
  refrigerator: Refrigerator,
  monitor: Monitor,
};

export const OrderPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [transportMode, setTransportMode] = useState('Motor');
  const [damageSeverity, setDamageSeverity] = useState('Ringan');
  const [pickupDate, setPickupDate] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const transportOptions = [
    { id: 'Motor', label: 'Motor', cost: 10000, description: 'Cepat untuk barang kecil dan lokasi padat.' },
    { id: 'Mobil Pickup', label: 'Mobil Pickup', cost: 25000, description: 'Cocok untuk barang sedang dan akses biasa.' },
    { id: 'Truk', label: 'Truk', cost: 40000, description: 'Pilihan terbaik untuk muatan besar dan berat.' },
    { id: 'Gerobak', label: 'Gerobak', cost: 7000, description: 'Solusi ekonomis untuk jarak dekat dan barang ringan.' },
  ];

  const damageOptions = [
    { id: 'Ringan', label: 'Ringan' },
    { id: 'Sedang', label: 'Sedang' },
    { id: 'Parah', label: 'Parah' },
  ];

  const currentUser = useAuthStore((state) => state.currentUser);
  const allAddresses = useAddressStore((state) => state.addresses);
  const addresses = allAddresses.filter((address) => address.userId === currentUser?.id);
  const createOrder = useOrderStore((state) => state.createOrder);
  
  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
  const selectedTransportOption = transportOptions.find((option) => option.id === transportMode);
  const selectedDamageOption = damageOptions.find((option) => option.id === damageSeverity);
  
  const transportCost = selectedTransportOption?.cost ?? 0;
  
  const formattedPickupDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const updateQuantity = (id, delta) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalWeight = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    return sum + (itemWeights[id] || 0) * qty;
  }, 0);

  const totalEstimate = Object.entries(selectedItems).reduce((sum, [id, qty]) => {
    const type = electronicTypes.find((t) => t.id === id);
    return sum + (type ? type.price * qty : 0);
  }, 0);

  const grandTotal = totalEstimate + transportCost;

  const handleNextStep = () => {
    if (step === 1 && Object.keys(selectedItems).length === 0) return;
    if (step === 2 && !selectedAddressId) return;
    if (step === 3 && !pickupDate) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!currentUser) return;

      const orderItems = Object.entries(selectedItems)
        .map(([id, qty]) => {
          const type = electronicTypes.find((t) => t.id === id);
          if (!type) return null;
          return {
            typeId: id,
            typeName: type.name,
            quantity: qty,
            price: type.price,
          };
        })
        .filter((item) => item !== null);

      const orderId = createOrder({
        userId: currentUser.id,
        items: orderItems,
        totalEstimate,
        totalWeight,
        transportMode,
        damageSeverity,
        pickupDate,
        addressId: selectedAddressId,
        status: 'pending',
      });

      navigate(`/success?orderId=${orderId}`);
    }
  };

  return (
    <DashboardTemplate title="Pesan Penjemputan">
      <div className="max-w-5xl mx-auto">
        
        {/* Stepper Visual */}
        <div className="flex items-center justify-between mb-16 relative px-4 sm:px-10">
          <div className="absolute top-5 left-12 right-12 h-0.5 bg-slate-100 -z-10 hidden sm:block" />
          {[
            { n: 1, label: 'Pilih Barang', icon: Package },
            { n: 2, label: 'Alamat', icon: MapPin },
            { n: 3, label: 'Jadwal', icon: Calendar },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.n ? 'bg-cobalt text-ink-deep ring-4 ring-cobalt/10' : 'bg-white border border-hairline-soft text-slate-400'
                }`}>
                  {step > s.n ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${step >= s.n ? 'text-ink-deep' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Typography variant="h3">Pilih Jenis Elektronik</Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {electronicTypes.map((type) => {
                    const IconComponent = iconMap[type.icon] || Package;
                    return (
                      <Card key={type.id} className={`flex items-center justify-between transition-all duration-300 border-2 ${selectedItems[type.id] ? 'border-cobalt bg-cobalt/[0.02]' : 'border-hairline-soft'}`}>
                        <div className="flex items-center gap-4 pr-4">
                          <div className={`p-3 rounded-xl ${selectedItems[type.id] ? 'bg-cobalt text-ink-deep shadow-lg shadow-cobalt/20' : 'bg-slate-100 text-slate-500'}`}>
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <Typography variant="body" className="font-bold text-ink-deep">{type.name}</Typography>
                            <Typography variant="caption" className="text-slate-500 mt-0.5">
                              Rp{type.price.toLocaleString()} / unit
                            </Typography>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0 bg-white p-1 rounded-full border border-hairline-soft shadow-sm">
                          <button 
                            onClick={() => updateQuantity(type.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition-all text-slate-500 disabled:opacity-20"
                            disabled={!selectedItems[type.id]}
                            aria-label={`Kurangi ${type.name}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center font-bold text-sm text-ink-deep">
                            {selectedItems[type.id] || 0}
                          </span>
                          <button 
                            onClick={() => updateQuantity(type.id, 1)}
                            className="w-8 h-8 rounded-full bg-cobalt-deep text-white flex items-center justify-center hover:bg-cobalt transition-all shadow-md"
                            aria-label={`Tambah ${type.name}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <Typography variant="h3">Pilih Alamat Penjemputan</Typography>
                  <Button onClick={() => navigate('/address')} variant="secondary" className="px-6 py-2 text-xs">Kelola Alamat</Button>
                </div>
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <Card 
                        key={addr.id} 
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`cursor-pointer transition-all duration-300 border-2 ${selectedAddressId === addr.id ? 'border-cobalt bg-cobalt/[0.02] ring-1 ring-cobalt/20' : 'border-hairline-soft'}`}
                      >
                        <div className="flex items-start gap-5">
                          <div className={`p-3 rounded-xl transition-colors ${selectedAddressId === addr.id ? 'bg-cobalt text-ink-deep shadow-lg shadow-cobalt/20' : 'bg-slate-100 text-slate-500'}`}>
                            <MapPin size={24} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                               <Typography variant="body" className="font-bold text-ink-deep">{addr.label}</Typography>
                               {selectedAddressId === addr.id && <Check size={18} className="text-cobalt" />}
                            </div>
                            <Typography variant="caption" className="text-slate-500 block mb-2">{addr.fullName} • {addr.phoneNumber}</Typography>
                            <Typography variant="body" className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{addr.fullAddress}</Typography>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                        <MapPin size={32} />
                      </div>
                      <Typography variant="body" className="text-slate-500 mb-6">Belum ada alamat tersimpan.</Typography>
                      <Button onClick={() => navigate('/address')} variant="buy">Tambah Alamat Baru</Button>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Typography variant="h3" className="mb-8">Jadwalkan Penjemputan</Typography>
                <Card className="border-2 border-hairline-soft p-8">
                  <div className="space-y-8">
                    <div>
                      <label htmlFor="pickupDate" className="block text-sm font-bold text-ink-deep mb-3 uppercase tracking-wider">Tanggal Penjemputan</label>
                      <div className="relative">
                        <input 
                          id="pickupDate"
                          type="date" 
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-text pl-12 h-14"
                        />
                        <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="bg-secondary/10 p-6 rounded-2xl flex gap-5 items-start">
                      <div className="p-3 bg-white rounded-xl text-primary shadow-sm flex-shrink-0">
                        <Package size={24} />
                      </div>
                      <Typography variant="body" className="text-[15px] text-slate-700 leading-relaxed">
                        Layanan penjemputan tersedia setiap hari pukul <strong>09:00 - 17:00 WIB</strong>. 
                        Petugas kami akan menghubungi Anda melalui telepon saat dalam perjalanan.
                      </Typography>
                    </div>
                  </div>
                </Card>
                <Card className="border-2 border-hairline-soft p-8 mt-8">
                  <div className="space-y-6">
                    <div>
                      <Typography variant="body" className="font-bold text-ink-deep mb-4">Detail Pengangkutan</Typography>
                      <div className="grid grid-cols-1 gap-3">
                        {transportOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setTransportMode(option.id)}
                            className={`w-full rounded-3xl border p-4 text-left transition ${transportMode === option.id ? 'border-cobalt bg-cobalt/[0.08]' : 'border-hairline-soft bg-white hover:border-cobalt/70'}`}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <Typography variant="body" className="font-bold text-ink-deep">{option.label}</Typography>
                                <Typography variant="caption" className="text-slate-500 block mt-1">{option.description}</Typography>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Typography variant="body" className="font-bold text-ink-deep mb-4">Tingkat Kerusakan</Typography>
                      <div className="grid grid-cols-1 gap-3">
                        {damageOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setDamageSeverity(option.id)}
                            className={`w-full rounded-3xl border p-4 text-left transition ${damageSeverity === option.id ? 'border-cobalt bg-cobalt/[0.08]' : 'border-hairline-soft bg-white hover:border-cobalt/70'}`}
                          >
                            <Typography variant="body" className="font-bold text-ink-deep">{option.label}</Typography>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Right Column (Summary) */}
          <div className="lg:col-span-4">
            <Card variant="feature" className="sticky top-24 border-2 border-hairline-soft !p-8 shadow-xl shadow-slate-200/50">
              <Typography variant="h3" className="mb-8 pb-4 border-b border-hairline-soft">Ringkasan</Typography>
              <div className="space-y-5 mb-8">
                <Typography variant="h3" className="text-ink-deep">Detail Pesanan</Typography>
                {Object.entries(selectedItems).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(selectedItems).map(([id, qty]) => {
                      const type = electronicTypes.find((t) => t.id === id);
                      if (!type) return null;
                      return (
                        <div key={id} className="rounded-3xl border border-hairline-soft bg-white p-4">
                          <div className="flex justify-between items-center gap-4">
                            <div>
                              <span className="text-sm font-bold text-ink-deep">{type.name}</span>
                              <p className="text-xs text-slate-500 mt-1">Harga: Rp{type.price.toLocaleString()} / unit</p>
                            </div>
                            <span className="text-sm font-bold text-ink-deep">x{qty}</span>
                          </div>
                          <div className="mt-3 flex justify-between text-slate-500 text-xs">
                            <span>Subtotal</span>
                            <span>Rp{(type.price * qty).toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-medium">Belum ada barang dipilih</p>
                  </div>
                )}
                
                <div className="pt-6 border-t-2 border-slate-100 space-y-4">
                  <div className="flex justify-between items-center mb-1">
                    <Typography variant="caption" className="text-slate-500 font-bold uppercase tracking-widest">Total Estimasi</Typography>
                  </div>
                  <Typography variant="h2" className="text-cobalt font-bold">Rp{totalEstimate.toLocaleString()}</Typography>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Biaya Pengangkutan</span>
                    <span>Rp{transportCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Jenis Kerusakan</span>
                    <span>{selectedDamageOption?.label ?? 'Tidak ada kerusakan'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold pt-3 border-t border-slate-100">
                    <span>Total Bayar</span>
                    <span>Rp{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <Typography variant="h3" className="text-ink-deep">Alamat Penjemputan</Typography>
                {selectedAddress ? (
                  <Card className="border border-cobalt/20 bg-cobalt/5 p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-white text-cobalt shadow-sm">
                        <MapPin size={22} />
                      </div>
                      <div className="space-y-1">
                        <Typography variant="body" className="font-bold text-ink-deep">{selectedAddress.label}</Typography>
                        <Typography variant="caption" className="text-slate-500 block">{selectedAddress.fullName} • {selectedAddress.phoneNumber}</Typography>
                        <Typography variant="body" className="text-sm text-slate-600 leading-relaxed">{selectedAddress.fullAddress}</Typography>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-medium">Pilih alamat penjemputan pada langkah sebelumnya.</p>
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-4">
                <Typography variant="h3" className="text-ink-deep">Jadwal Penjemputan</Typography>
                {formattedPickupDate ? (
                  <Card className="border border-cobalt/20 bg-cobalt/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white text-cobalt shadow-sm">
                        <Calendar size={22} />
                      </div>
                      <div>
                        <Typography variant="body" className="font-bold text-ink-deep">{formattedPickupDate}</Typography>
                        <Typography variant="caption" className="text-slate-500 block">Penjemputan tersedia 09:00 - 17:00 WIB.</Typography>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-medium">Pilih tanggal penjemputan untuk melihat detail jadwal.</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleNextStep} 
                  variant="buy" 
                  className="w-full flex items-center justify-center gap-3 h-14 shadow-xl shadow-cobalt/40 group relative overflow-hidden"
                  disabled={
                    (step === 1 && Object.keys(selectedItems).length === 0) ||
                    (step === 2 && !selectedAddressId) ||
                    (step === 3 && !pickupDate)
                  }
                >
                  <span className="relative z-10 text-[15px] tracking-tight">{step === 3 ? 'Konfirmasi Pesanan' : 'Lanjutkan'}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="w-full py-2 text-[13px] font-bold text-slate-400 hover:text-ink-deep transition-colors uppercase tracking-widest"
                  >
                    Kembali
                  </button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};
