import { DashboardTemplate } from '../components/templates/DashboardTemplate/DashboardTemplate';
import { Card } from '../components/atoms/Card/Card';
import { Typography } from '../components/atoms/Typography/Typography';
import { useAuthStore } from '../stores/authStore';
import { User, Mail, Shield, Trash2, LogOut, ChevronRight } from 'lucide-react';

export const SettingsPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const handleResetApp = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh data Relecta? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const sections = [
    {
      title: 'Profil Pengguna',
      items: [
        { label: 'Nama Lengkap', value: currentUser?.fullName, icon: User, action: false },
        { label: 'Email', value: currentUser?.email, icon: Mail, action: false },
      ]
    },
    {
      title: 'Keamanan',
      items: [
        { label: 'Ganti Password', value: '••••••••', icon: Shield, action: true },
      ]
    }
  ];

  return (
    <DashboardTemplate title="Pengaturan">
      <div className="max-w-2xl mx-auto space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <Typography variant="h3" className="mb-6">{section.title}</Typography>
            <Card className="p-0 overflow-hidden">
              {section.items.map((item, j) => (
                <div 
                  key={j} 
                  className={`flex items-center justify-between p-6 ${j !== section.items.length - 1 ? 'border-b border-hairline-soft' : ''} ${item.action ? 'cursor-pointer hover:bg-slate-50 transition-all group' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider mb-0.5">{item.label}</Typography>
                      <Typography variant="body" className="font-bold">{item.value}</Typography>
                    </div>
                  </div>
                  {item.action && <ChevronRight size={20} className="text-slate-300 group-hover:text-ink transition-all" />}
                </div>
              ))}
            </Card>
          </section>
        ))}

        <section>
          <Typography variant="h3" className="mb-6 text-critical-strong">Zona Bahaya</Typography>
          <div className="space-y-4">
            <button 
              onClick={handleResetApp}
              className="w-full flex items-center justify-between p-6 bg-white rounded-xl border border-critical/20 hover:bg-critical/5 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2.5 rounded-xl bg-critical/10 text-critical-strong">
                  <Trash2 size={20} />
                </div>
                <div>
                  <Typography variant="body" className="font-bold text-critical-strong">Reset Aplikasi</Typography>
                  <Typography variant="caption" className="text-slate-500">Hapus seluruh data akun, alamat, dan riwayat pesanan.</Typography>
                </div>
              </div>
              <ChevronRight size={20} className="text-critical/30 group-hover:text-critical-strong transition-all" />
            </button>

            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-6 bg-white rounded-xl border border-hairline-soft hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500">
                  <LogOut size={20} />
                </div>
                <div>
                  <Typography variant="body" className="font-bold">Keluar Sesi</Typography>
                  <Typography variant="caption" className="text-slate-500">Keluar dari akun Anda saat ini.</Typography>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-ink transition-all" />
            </button>
          </div>
        </section>
      </div>
    </DashboardTemplate>
  );
};
