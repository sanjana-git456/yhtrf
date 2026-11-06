import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { ArrowLeft, Save, Wand2 } from 'lucide-react';

export default function CreateProject() {
  const [form, setForm] = useState({ title: '', description: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await client.post('/projects/', form);
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleAIAssist = () => {
    // Simulated AI generation for step-by-step templates
    setForm({
      ...form,
      description: "Step 1: Gather materials (Wood, Glue, Sandpaper)\nStep 2: Measure and cut base pieces\nStep 3: Assemble using wood glue and clamps\nStep 4: Sand surfaces for a smooth finish\nStep 5: Apply protective sealant."
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-6">New Project Showcase</h1>
        
        {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="e.g. Hand-carved Walnut Spoon"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">Description & Steps</label>
              <button 
                type="button"
                onClick={handleAIAssist}
                className="text-xs flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200 hover:bg-amber-100"
              >
                <Wand2 size={14} /> AI Template Assist
              </button>
            </div>
            <textarea 
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Describe your process and materials..."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (Optional)</label>
            <input 
              type="url" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="https://images.unsplash.com/photo..."
              value={form.image_url}
              onChange={e => setForm({...form, image_url: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 transition disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Creating...' : 'Publish Project'}
          </button>
        </form>
      </div>
    </div>
  );
}