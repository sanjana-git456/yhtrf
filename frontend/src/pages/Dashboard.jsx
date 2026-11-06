import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Box, Calendar, Award, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ project_count: 0, workshop_count: 0, points: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/dashboard/stats')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.username}!</h1>
        <p className="text-slate-600">Here's what's happening in your workshop today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
            <Box size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Your Projects</p>
            <p className="text-2xl font-bold">{stats.project_count}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Workshops</p>
            <p className="text-2xl font-bold">{stats.workshop_count}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Maker Points</p>
            <p className="text-2xl font-bold">{stats.points}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/projects/new" className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-rose-400 hover:bg-rose-50 transition group">
              <PlusCircle className="text-slate-400 group-hover:text-rose-600 mb-2" size={32} />
              <span className="font-medium text-slate-600 group-hover:text-rose-600">New Project</span>
            </Link>
            <Link to="/workshops/new" className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition group">
              <Calendar className="text-slate-400 group-hover:text-blue-600 mb-2" size={32} />
              <span className="font-medium text-slate-600 group-hover:text-blue-600">Host Workshop</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6">Referral Program</h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Share your referral code to earn badges</p>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 font-mono text-lg font-bold text-rose-600">
              {user?.referral_code || 'LOADING...'}
              <button className="text-xs bg-slate-900 text-white px-3 py-1 rounded-md font-sans">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}