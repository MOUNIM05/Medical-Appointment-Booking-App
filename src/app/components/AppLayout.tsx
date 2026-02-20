import { Outlet } from 'react-router';
import { MobileNav } from './MobileNav';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Outlet />
      <div className="h-20" />
      <MobileNav />
    </div>
  );
}
