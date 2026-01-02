import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  Cpu, 
  PlugZap, 
  Settings,
  Database
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`
    }
  >
    {icon}
    <span className="font-medium text-sm tracking-wide">{label}</span>
  </NavLink>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-850 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Network size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">UAF Manager</h1>
            <p className="text-xs text-slate-500 font-mono">v2.4.0-RC</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <div className="px-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Core Modules
          </div>
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/model" icon={<Database size={20} />} label="Information Model" />
          <NavItem to="/engine" icon={<Cpu size={20} />} label="Execution Engines" />
          <NavItem to="/gateway" icon={<PlugZap size={20} />} label="Info Gateway" />
          
          <div className="mt-8 px-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            System
          </div>
          <NavItem to="/settings" icon={<Settings size={20} />} label="Configuration" />
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
              AD
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900">
        {children}
      </main>
    </div>
  );
};