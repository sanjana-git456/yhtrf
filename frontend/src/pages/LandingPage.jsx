import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Users, Zap, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-2xl">
          <Hammer size={32} />
          <span>CraftCircle</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 font-medium hover:text-rose-600">Log in</Link>
          <Link to="/register" className="bg-rose-600 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-700 transition">Join the Circle</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            The Privacy-First Home for <span className="text-rose-600">Makers</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Showcase your DIY projects, host live build sessions, and collaborate with fellow artisans in a space built for creators, not advertisers.
          </p>
          <Link to="/register" className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition shadow-xl">
            Start Your First Project
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-32">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Privacy First</h3>
            <p className="text-slate-600">No algorithmic manipulation. You control your feed and your data. Always.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Workshops</h3>
            <p className="text-slate-600">Monetize your skills with integrated ticket sales and real-time build sessions.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Workspaces</h3>
            <p className="text-slate-600">Collaborate on sketches and project plans in dedicated shared environments.</p>
          </div>
        </div>
      </main>
    </div>
  );
}