import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Box, Clock, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('chronological');

  useEffect(() => {
    setLoading(true);
    client.get('/projects/')
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false));
  }, [mode]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Project Showcase</h1>
          <p className="text-slate-600">Discover what the community is building.</p>
        </div>
        
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setMode('chronological')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${mode === 'chronological' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Clock size={16} /> Chronological
          </button>
          <button 
            onClick={() => setMode('algorithmic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${mode === 'algorithmic' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <TrendingUp size={16} /> Algorithmic
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300">
              <Box size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">No projects yet</h3>
              <p className="text-slate-600 mb-6">Be the first to showcase your work!</p>
              <Link to="/projects/new" className="bg-rose-600 text-white px-6 py-2 rounded-full font-medium">Create Project</Link>
            </div>
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                  <Box size={48} />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-600 line-clamp-2 mb-4">{project.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {project.maker.username[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{project.maker.username}</span>
                  </div>
                  <button className="text-rose-600 text-sm font-bold hover:underline">View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Link 
        to="/projects/new" 
        className="fixed bottom-8 right-8 bg-rose-600 text-white p-4 rounded-full shadow-2xl hover:bg-rose-700 transition transform hover:scale-110"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}