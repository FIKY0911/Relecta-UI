import { useState } from 'react';
import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { Button } from '../components/atoms/Button/Button';
import { Input } from '../components/atoms/Input/Input';
import { Label } from '../components/atoms/Label/Label';
import { useAddressStore } from '../stores/addressStore';
import { useAuthStore } from '../stores/authStore';
import { Plus, Trash2, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  fullAddress: z.string().min(10, 'Full address is required'),
});

type AddressInput = z.infer<typeof addressSchema>;

export const AddressPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const { addresses, createAddress, deleteAddress, setMainAddress } = useAddressStore();
  const userAddresses = currentUser ? addresses.filter((address) => address.userId === currentUser.id) : [];
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressInput) => {
    if (!currentUser) return;
    createAddress({ ...data, isMain: userAddresses.length === 0, userId: currentUser.id });
    setIsAdding(false);
    reset();
  };

  return (
    <DashboardTemplate title="Kelola Alamat">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
          <Typography variant="h3">Alamat Saya</Typography>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2 h-12 px-5">
              <Plus size={18} />
              Tambah Alamat
            </Button>
          )}
        </div>

        {isAdding && (
          <Card className="mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h3">Alamat Baru</Typography>
              <button onClick={() => setIsAdding(false)} className="text-sm font-bold text-slate-400 hover:text-ink">Batal</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label>Label Alamat (Rumah, Kantor, dsb)</Label>
                <Input {...register('label')} error={!!errors.label} placeholder="Contoh: Rumah" />
                {errors.label && <p className="mt-1 text-xs text-critical-strong">{errors.label.message}</p>}
              </div>
              <div>
                <Label>Nama Penerima</Label>
                <Input {...register('fullName')} error={!!errors.fullName} placeholder="Nama Lengkap" />
                {errors.fullName && <p className="mt-1 text-xs text-critical-strong">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label>Nomor Telepon</Label>
                <Input {...register('phoneNumber')} error={!!errors.phoneNumber} placeholder="0812..." />
                {errors.phoneNumber && <p className="mt-1 text-xs text-critical-strong">{errors.phoneNumber.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label>Alamat Lengkap</Label>
                <textarea 
                  {...register('fullAddress')}
                  className={`input-text h-24 resize-none ${errors.fullAddress ? 'input-error' : ''}`}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, dsb"
                />
                {errors.fullAddress && <p className="mt-1 text-xs text-critical-strong">{errors.fullAddress.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full">Simpan Alamat</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-4">
          {userAddresses.length > 0 ? (
            userAddresses.map((address) => {
              const cardClass = address.isMain
                ? 'flex flex-col gap-4 md:flex-row md:items-start justify-between border-cobalt ring-1 ring-cobalt/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg'
                : 'flex flex-col gap-4 md:flex-row md:items-start justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg';
              const iconClass = address.isMain
                ? 'p-3 rounded-xl bg-cobalt/10 text-primary shrink-0'
                : 'p-3 rounded-xl bg-slate-100 text-slate-500 shrink-0';
              const mainButtonClass = 'mt-4 inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 transition-colors';

              return (
                <Card key={address.id} className={cardClass}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:flex-1">
                    <div className={iconClass}>
                      <MapPin size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Typography variant="body" className="font-bold">{address.label}</Typography>
                        {address.isMain && (
                          <span className="bg-cobalt/20 text-ink-deep text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Utama
                          </span>
                        )}
                      </div>
                      <Typography variant="body" className="font-bold text-sm mb-1">{address.fullName}</Typography>
                      <Typography variant="caption" className="text-slate-500 mb-2 block">{address.phoneNumber}</Typography>
                      <Typography variant="body" className="text-sm text-slate-600 leading-relaxed max-w-md">
                        {address.fullAddress}
                      </Typography>
                      {!address.isMain && (
                        <button 
                          onClick={() => setMainAddress(address.id)}
                          className={mainButtonClass}
                        >
                          Jadikan Alamat Utama
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="self-start rounded-full p-2 text-slate-400 hover:text-critical-strong transition-colors hover:bg-slate-100"
                    aria-label={`Hapus alamat ${address.label}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </Card>
              );
            })
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2">
              <Typography variant="body" className="text-slate-500 mb-6">Belum ada alamat yang tersimpan.</Typography>
              <Button onClick={() => setIsAdding(true)} variant="secondary">Tambah Alamat Baru</Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};
