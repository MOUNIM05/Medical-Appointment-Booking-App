import { Calendar, Home as HomeIcon, Search, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const items = [
  { label: 'Accueil', icon: HomeIcon, path: '/' },
  { label: 'Recherche', icon: Search, path: '/search' },
  { label: 'RDV', icon: Calendar, path: '/appointments' },
  { label: 'Profil', icon: User, path: '/profile' },
];

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 shadow-lg z-20">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {items.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-3 text-xs ${
                active ? 'text-[#5a6ff0]' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="mt-1">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
