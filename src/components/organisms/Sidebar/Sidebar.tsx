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
    <aside className="w-full lg:w-64 bg-white border-r border-slate-100 flex flex-col h-full lg:h-screen sticky top-0">
      <div className="p-6">
        <Typography variant="h3" className="text-emerald-600 font-bold">Relecta</Typography>
      </div>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <UserIcon size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">{currentUser?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};
