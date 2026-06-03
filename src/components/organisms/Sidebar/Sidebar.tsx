import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Home, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';
import { Typography } from '../../atoms/Typography/Typography';

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const currentUser = useAuthStore((state) => state.currentUser);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/maps', label: 'Bank Sampah', icon: MapPin },
    { to: '/address', label: 'Alamat', icon: Home },
    { to: '/order', label: 'Pesan Antar', icon: PlusCircle },
    { to: '/history', label: 'Riwayat', icon: History },
    { to: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-hairline-soft flex flex-col h-full lg:h-screen sticky top-0">
      <div className="p-6">
        <Typography variant="h3" className="text-primary font-bold">Relecta</Typography>
      </div>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive 
                ? 'bg-primary text-ink-deep' 
                : 'text-slate-500 hover:bg-secondary/10 hover:text-ink-deep'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-hairline-soft">
        <div className="flex items-center gap-3 px-4 py-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
            <UserIcon size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-ink-deep truncate">{currentUser?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-critical-strong hover:bg-critical/10 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};
