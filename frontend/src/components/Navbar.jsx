import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hammer, LogOut, User, LayoutDashboard, Calendar, Box } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 fixed w-full z-30 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 text-rose-600 font-bold text-xl">
              <Hammer size={28} />
              <span>CraftCircle</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-slate-600 hover:text-rose-600 flex items-center gap-1">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/projects" className="text-slate-600 hover:text-rose-600 flex items-center gap-1">
                <Box size={18} /> Projects
              </Link>
              <Link to="/workshops" className="text-slate-600 hover:text-rose-600 flex items-center gap-1">
                <Calendar size={18} /> Workshops
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700">
              <User size={20} />
              <span className="font-medium">{user?.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}