import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Calendar, Users, Ticket, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);

  useEffect(() => {
    client.get('/workshops/')
      .then(res => setWorkshops(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleJoin = async (id) => {
    setJoining(id);
    try {
      await client.post(`/workshops/${id}/join`);
      alert('Successfully joined the workshop!');
    } catch (err) {
      alert('Failed to join workshop');
    } finally {
      setJoining(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Live Build Sessions</h1>
          <p className="text-slate-600">Join interactive workshops hosted by expert makers.</p>
        </div>
        <Link to="/workshops/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} /> Host Session
        </Link>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading sessions...</div>
        ) : workshops.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No upcoming workshops</h3>
            <p className="text-slate-600 mb-6">Be the first to host a live session!</p>
          </div>
        ) : (
          workshops.map(ws => (
            <div key={ws.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2 uppercase tracking-wider">
                  <Users size={16} /> Live Workshop
                </div>
                <h3 className="text-2xl font-bold mb-3">{ws.title}</h3>
                <p className="text-slate-600 mb-6">{ws.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <Calendar size={14} /> {new Date(ws.scheduled_at).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <Users size={14} /> Hosted by {ws.host.username}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">${ws.price.toFixed(2)}</div>
                <div className="text-xs text-slate-500 mb-6">Per attendee</div>
                <button 
                  onClick={() => handleJoin(ws.id)}
                  disabled={joining === ws.id}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-50"
                >
                  <Ticket size={20} />
                  {joining === ws.id ? 'Processing...' : 'Get Ticket'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}