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
  Check, 
  Plus,
  Bike, 
  Truck,
  ShoppingCart,
  Info,
  Leaf,
  Trash2,
  ChevronRight,
  Laptop,
  Smartphone,
  Tv,
  Printer,
  Refrigerator,
  Monitor,
} from 'lucide-react';
import { Badge } from '../components/atoms/Badge/Badge';

const iconMap: Record<string, typeof Laptop> = {
  laptop: Laptop,
  smartphone: Smartphone,
  tv: Tv,
  printer: Printer,
  refrigerator: Refrigerator,
  monitor: Monitor,
};

const CustomSelect = ({ 
  value, 
  onChange, 
  options 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: {id: string, name: string}[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border ${isOpen ? 'border-emerald-600 border-2' : 'border-slate-300'} rounded-[8px] px-3 h-11 text-left text-[16px] tracking-[-0.16px] text-slate-900 transition-all outline-none flex items-center justify-between group hover:border-emerald-500`}
      >
        <span className="truncate">{selectedOption?.name || 'Pilih Kategori'}</span>
        <ChevronRight size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? '-rotate-90 text-emerald-600' : 'rotate-90 group-hover:text-emerald-500'}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-[12px] shadow-[0_4px_20px_rgba(20,22,26,0.08)] z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[14px] tracking-[-0.14px] transition-colors flex items-center justify-between ${
                    value === option.id 
                      ? 'bg-emerald-50 text-emerald-800 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {option.name}
                  {value === option.id && <Check size={16} className="text-emerald-600" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const OrderPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<Array<{ id: string, name: string, categoryId: string, weightKg: number }>>([
    { id: 'item-initial', name: '', categoryId: 'laptop', weightKg: 0 }
  ]);
  const [transportMode, setTransportMode] = useState<'Motor' | 'Mobil Pickup' | 'Truk' | 'Gerobak'>('Motor');
  const [damageSeverity, setDamageSeverity] = useState<'Ringan' | 'Sedang' | 'Parah'>('Ringan');
  const [pickupDate, setPickupDate] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [toast, setToast] = useState<{show: boolean, message: string} | null>(null);

  const addItem = () => {
    const newId = `item-${Date.now()}`;
    setItems([...items, { id: newId, name: '', categoryId: 'laptop', weightKg: 0 }]);
    showToast('Baris barang baru ditambahkan');
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const transportOptions = [
    { id: 'Motor' as const, label: 'Motor', cost: 0, icon: Bike, description: 'Cepat untuk barang kecil dan lokasi padat.' },
    { id: 'Mobil Pickup' as const, label: 'Mobil Pickup', cost: 0, icon: Truck, description: 'Cocok untuk barang sedang dan akses biasa.' },
    { id: 'Truk' as const, label: 'Truk', cost: 0, icon: Truck, description: 'Pilihan terbaik untuk muatan besar dan berat.' },
    { id: 'Gerobak' as const, label: 'Gerobak', cost: 0, icon: ShoppingCart, description: 'Solusi ekonomis (Gratis) untuk jarak sangat dekat.' },
  ];

  const damageOptions = [
    { id: 'Ringan' as const, label: 'Ringan', color: 'bg-emerald-500' },
    { id: 'Sedang' as const, label: 'Sedang', color: 'bg-amber-500' },
    { id: 'Parah' as const, label: 'Parah', color: 'bg-rose-500' },
  ];

  const currentUser = useAuthStore((state) => state.currentUser);
  const allAddresses = useAddressStore((state) => state.addresses);
  const addresses = allAddresses.filter((address) => address.userId === currentUser?.id);
  const createOrder = useOrderStore((state) => state.createOrder);
  
  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
  const selectedTransportOption = transportOptions.find((option) => option.id === transportMode);
  
  const transportCost = selectedTransportOption?.cost ?? 0;
  
  const formattedPickupDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast(null), 3000);
  };

  const totalWeight = items.reduce((sum, item) => sum + (item.weightKg || 0), 0);

  const totalEstimate = items.reduce((sum, item) => {
    const type = electronicTypes.find((t) => t.id === item.categoryId);
    return sum + (type ? type.price : 0);
  }, 0);

  const grandTotal = totalEstimate + transportCost;

  const handleNextStep = () => {
    if (step === 1) {
      const isValid = items.every(item => item.name && item.weightKg > 0);
      if (!isValid) {
        showToast('Mohon lengkapi detail barang (Nama & Berat)');
        return;
      }
    }
    if (step === 2 && !selectedAddressId) return;
    if (step === 3 && !pickupDate) return;
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!currentUser) return;

      const orderItems = items.map(item => {
        const type = electronicTypes.find((t) => t.id === item.categoryId);
        return {
          typeId: item.categoryId,
          typeName: item.name || type?.name || 'Barang Elektronik',
          quantity: 1,
          price: type?.price || 0,
          weightKg: item.weightKg,
        };
      });

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
      <div className="w-full mt-6">
        {/* Top Navigation: Horizontal Stepper */}
        <div className="mb-12 max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 -z-10" />
            {[
              { n: 1, label: 'Detail Barang', icon: Package },
              { n: 2, label: 'Alamat Lokasi', icon: MapPin },
              { n: 3, label: 'Jadwal Pickup', icon: Calendar },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = step === s.n;
              const isCompleted = step > s.n;

              return (
                <div key={s.n} className="flex flex-col items-center gap-3 bg-slate-50 px-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10
                    ${isActive ? 'bg-emerald-600 text-white shadow-none' : ''}
                    ${isCompleted ? 'bg-emerald-500 text-white shadow-none' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-2 border-slate-200 text-slate-400' : ''}
                  `}>
                    {isCompleted ? (
                      <Check size={20} strokeWidth={3} className="animate-in zoom-in duration-300" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`text-[12px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive || isCompleted ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Main Content Area (58% width approx ~ 7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <Typography variant="h2" className="text-[28px] font-medium leading-tight">Detail Barang</Typography>
                    <Typography variant="body" className="text-slate-500 mt-2 text-[16px] leading-relaxed">Masukkan rincian perangkat elektronik yang ingin Anda buang.</Typography>
                  </div>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="p-5 border border-slate-200 rounded-[16px] relative group shadow-none hover:shadow-none animate-in slide-in-from-right-4 duration-300">
                      <div className="flex flex-col lg:flex-row items-center gap-4">
                        {/* Column: Category */}
                        <div className="w-full lg:w-1/3">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-2 block">Kategori</label>
                          <CustomSelect 
                            value={item.categoryId}
                            onChange={(val) => updateItem(item.id, 'categoryId', val)}
                            options={electronicTypes}
                          />
                        </div>

                        {/* Column: Specific Name */}
                        <div className="w-full lg:flex-1">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-2 block">Nama Spesifik</label>
                          <input
                            type="text"
                            placeholder="Contoh: Laptop HP"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-[8px] px-3 h-11 text-[16px] tracking-[-0.16px] text-slate-900 focus:border-emerald-600 focus:border-2 transition-all outline-none placeholder:text-slate-400"
                          />
                        </div>

                        {/* Column: Manual Weight */}
                        <div className="w-full lg:w-24">
                          <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-2 block">Berat (kg)</label>
                          <input
                            type="number"
                            min="1"
                            value={item.weightKg || ''}
                            onChange={(e) => updateItem(item.id, 'weightKg', parseInt(e.target.value) || 0)}
                            className="w-full bg-white border border-slate-300 rounded-[8px] px-3 h-11 text-[16px] tracking-[-0.16px] text-slate-900 focus:border-emerald-600 focus:border-2 transition-all outline-none text-center"
                          />
                        </div>

                        {/* Column: Delete Action */}
                        <div className="w-full lg:w-auto mt-6 lg:mt-0 flex items-end">
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className="w-11 h-11 rounded-[8px] flex items-center justify-center text-slate-400 hover:text-rose-500 border border-transparent hover:border-rose-200 hover:bg-rose-50 transition-all disabled:opacity-20"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <button
                    onClick={addItem}
                    className="w-full py-3 border border-slate-300 rounded-[100px] flex items-center justify-center gap-2 text-slate-900 hover:bg-slate-100 transition-all bg-transparent"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                    <span className="font-bold text-[14px] tracking-[-0.14px]">Tambah Barang</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <Typography variant="h2" className="text-[28px] font-medium leading-tight">Alamat Penjemputan</Typography>
                    <Typography variant="body" className="text-slate-500 mt-2 text-[16px] leading-relaxed">Pilih salah satu alamat tersimpan Anda.</Typography>
                  </div>
                  <Button onClick={() => navigate('/address')} variant="secondary" className="px-6 py-2 text-[14px] rounded-[100px]">
                    Tambah Alamat
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {addresses.length > 0 ? (
                    addresses.map((addr, index) => (
                      <Card 
                        key={addr.id} 
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`
                          group cursor-pointer transition-all duration-200 border relative overflow-hidden h-full p-6 rounded-[24px] shadow-none hover:shadow-none
                          ${selectedAddressId === addr.id ? 'border-emerald-600 border-2 bg-emerald-50/20' : 'border-slate-200 bg-white hover:border-emerald-500'}
                        `}
                      >
                        {/* Decorative background pattern */}
                        <div className="absolute -right-4 -bottom-4 text-slate-50 group-hover:text-emerald-50/40 transition-colors pointer-events-none">
                          <MapPin size={120} strokeWidth={1} />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`
                              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                              ${selectedAddressId === addr.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'}
                            `}>
                              <MapPin size={20} />
                            </div>
                            <div className="flex items-center gap-2">
                              {index === 0 && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-md tracking-wider">Utama</span>
                              )}
                              {selectedAddressId === addr.id && (
                                <Check size={20} strokeWidth={3} className="text-emerald-600 animate-in zoom-in duration-200" />
                              )}
                            </div>
                          </div>

                          <Typography variant="h3" className="font-medium text-slate-900 mb-1 text-[20px]">{addr.label}</Typography>
                          <Typography variant="body" className="text-slate-500 block mb-2 font-medium text-[14px]">{addr.fullName} • {addr.phoneNumber}</Typography>
                          <Typography variant="body" className="text-slate-600 line-clamp-2 leading-relaxed text-[14px]">{addr.fullAddress}</Typography>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="sm:col-span-2 flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-slate-200 bg-slate-50/50 rounded-[32px] shadow-none">
                      <MapPin size={48} className="text-slate-300 mb-6" />
                      <Typography variant="h3" className="font-medium text-slate-900 mb-2 text-[24px]">Belum Ada Alamat</Typography>
                      <Typography variant="body" className="text-slate-500 mb-6 text-[16px]">Anda perlu menambahkan alamat terlebih dahulu.</Typography>
                      <Button onClick={() => navigate('/address')} variant="buy" className="px-8 rounded-[100px]">Tambah Alamat Baru</Button>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <Typography variant="h2" className="text-[28px] font-medium leading-tight">Jadwal & Transportasi</Typography>
                    <Typography variant="body" className="text-slate-500 mt-2 text-[16px] leading-relaxed">Atur detail penjemputan barang Anda.</Typography>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {/* Jadwal & Kondisi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-slate-200 p-6 rounded-[24px] bg-white shadow-none">
                      <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4 block">Tanggal Penjemputan</label>
                      <div className="relative mb-6">
                        <input 
                          id="pickupDate"
                          type="date" 
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-white border border-slate-300 rounded-[8px] px-12 h-11 text-[16px] text-slate-900 focus:border-emerald-600 focus:border-2 transition-all outline-none"
                        />
                        <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-[12px] border border-slate-100">
                        <Info size={18} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <Typography variant="body" className="text-[12px] text-slate-600 leading-relaxed">
                          Penjemputan dilakukan pukul <strong>09:00 - 17:00 WIB</strong>.
                        </Typography>
                      </div>
                    </Card>

                    <Card className="border border-slate-200 p-6 rounded-[24px] bg-white shadow-none">
                      <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4 block">Kondisi Barang Mayoritas</label>
                      <div className="space-y-3">
                        {damageOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setDamageSeverity(option.id)}
                            className={`
                              w-full flex items-center justify-between p-4 rounded-[8px] border transition-all duration-200
                              ${damageSeverity === option.id ? 'border-emerald-600 border-2 bg-emerald-50/10' : 'border-slate-200 bg-white hover:border-emerald-500'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${option.color}`} />
                              <span className={`font-medium text-[16px] tracking-[-0.16px] ${damageSeverity === option.id ? 'text-emerald-900' : 'text-slate-700'}`}>{option.label}</span>
                            </div>
                            {damageSeverity === option.id && <Check size={18} className="text-emerald-600" strokeWidth={3} />}
                          </button>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Opsi Transportasi */}
                  <Card className="border border-slate-200 p-6 rounded-[24px] bg-white shadow-none">
                    <label className="text-[12px] font-bold uppercase tracking-widest text-slate-900 mb-4 block">Opsi Transportasi</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {transportOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = transportMode === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setTransportMode(option.id)}
                            className={`
                              flex items-start gap-4 p-5 rounded-[16px] border transition-all duration-200 text-left
                              ${isSelected ? 'border-emerald-600 border-2 bg-emerald-50/10' : 'border-slate-200 bg-white hover:border-emerald-500'}
                            `}
                          >
                            <div className={`
                              mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0
                              ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}
                            `}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-bold text-[16px] tracking-[-0.16px] ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>{option.label}</span>
                                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-[4px] bg-emerald-100 text-emerald-800 tracking-wider">
                                  Gratis
                                </span>
                              </div>
                              <p className="text-[14px] text-slate-500 tracking-[-0.14px] leading-relaxed">{option.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Summary - 42% width approx ~ 5 cols) */}
          <div className="lg:col-span-5">
            <Card variant="feature" className="sticky top-24 border border-slate-200 p-6 shadow-[0_1px_4px_rgba(20,22,26,0.08)] rounded-[16px] bg-white">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <Typography variant="h3" className="text-[20px] font-medium text-slate-900">Ringkasan Pesanan</Typography>
                <span className="text-[12px] font-medium text-slate-500">Langkah {step} dari 3</span>
              </div>

              <div className="space-y-4 mb-6">
                {items.length > 0 && items[0].name ? (
                  <div className="space-y-3">
                    {items.map((item) => {
                      const type = electronicTypes.find((t) => t.id === item.categoryId);
                      return (
                        <div key={item.id} className="flex justify-between items-start">
                          <div>
                            <p className="text-[14px] font-bold text-slate-900 tracking-[-0.14px]">{item.name || 'Barang Elektronik'}</p>
                            <p className="text-[12px] text-slate-500">{type?.name} • {item.weightKg} kg</p>
                          </div>
                          <span className="text-[14px] font-medium text-slate-900">Rp{type?.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-[14px] text-slate-400">Belum ada rincian barang.</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-slate-600">Subtotal</span>
                    <span className="text-[14px] font-medium text-slate-900">Rp{totalEstimate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-slate-600">Biaya Pengiriman</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-[4px] bg-emerald-100 text-emerald-800 tracking-wider">Gratis</span>
                  </div>
                  
                  <div className="flex justify-between items-end pt-4 mt-2 border-t border-slate-100">
                    <span className="text-[16px] font-bold text-slate-900">Total Estimasi</span>
                    <span className="text-[24px] font-medium text-emerald-600 tracking-tight">Rp{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleNextStep} 
                  variant="buy" 
                  className="w-full flex items-center justify-center rounded-[100px] h-[48px] bg-emerald-600 text-white shadow-none hover:bg-emerald-700"
                  disabled={
                    (step === 1 && (items.length === 0 || !items[0].name)) ||
                    (step === 2 && !selectedAddressId) ||
                    (step === 3 && !pickupDate)
                  }
                >
                  <span className="text-[14px] font-bold tracking-[-0.14px]">{step === 3 ? 'KONFIRMASI SEKARANG' : 'LANJUTKAN'}</span>
                </Button>
                
                {step > 1 && (
                  <Button 
                    onClick={() => setStep(step - 1)}
                    variant="ghost"
                    className="w-full h-[40px] text-[14px] font-bold text-slate-500 rounded-[100px] border border-transparent shadow-none hover:bg-slate-50 transition-colors"
                  >
                    KEMBALI
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-[100px] shadow-lg flex items-center gap-2 border border-slate-800">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-[14px] font-bold tracking-[-0.14px]">{toast.message}</span>
          </div>
        </div>
      )}
    </DashboardTemplate>
  );
};
