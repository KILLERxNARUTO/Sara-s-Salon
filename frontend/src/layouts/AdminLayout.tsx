import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scissors, Image, Users, Star, Settings, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Services', href: '/admin/services', icon: Scissors },
    { label: 'Gallery', href: '/admin/gallery', icon: Image },
    { label: 'Team', href: '/admin/team', icon: Users },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#191715] text-[#EFE3D5]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#2A2623] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <Logo variant="light" size="sm" />
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B8955A] px-3">
            Admin Console
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2A2623] text-[#D4B87A]'
                      : 'text-[#E5D3BF]/70 hover:bg-[#2A2623]/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-[#E5D3BF]/60 hover:text-white transition-colors py-2 px-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#2A2623] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <Logo variant="light" size="sm" showSubtitle={false} />
          </div>
          <div className="text-xs text-[#E5D3BF]/70 ml-auto">
            Logged in as Studio Administrator
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
