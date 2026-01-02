import React from 'react';
import { Activity, CheckCircle, AlertTriangle, Play, Database, Server, RefreshCw } from 'lucide-react';
import { MOCK_HEALTH } from '../constants';
import { EngineStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock chart data
const EVENTS_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  events: Math.floor(Math.random() * 3000) + 1000,
  latency: Math.floor(Math.random() * 50) + 10
}));

const QUALITY_DATA = [
  { name: 'Site 1', valid: 98, invalid: 2 },
  { name: 'Site 2', valid: 92, invalid: 8 },
  { name: 'Site 3', valid: 95, invalid: 5 },
];

const StatusBadge: React.FC<{ status: EngineStatus }> = ({ status }) => {
  const styles = {
    [EngineStatus.Running]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [EngineStatus.Stopped]: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    [EngineStatus.Warning]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [EngineStatus.Error]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-slate-400 mt-1">Unified Analytic Framework operational status</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
              <RefreshCw size={16} /> Refresh Metrics
           </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Activity className="text-indigo-400" size={24} />
            </div>
            <StatusBadge status={MOCK_HEALTH.engineStatus} />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Calculation Engine</h3>
          <p className="text-2xl font-bold text-white mt-1">Active</p>
          <div className="text-xs text-slate-500 mt-2">Processing 245 rules/sec</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="text-emerald-400" size={24} />
            </div>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">CONNECTED</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Unified Namespace</h3>
          <p className="text-2xl font-bold text-white mt-1">Online</p>
          <div className="text-xs text-slate-500 mt-2">Broker: mqtt://10.0.4.50</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Database className="text-amber-400" size={24} />
            </div>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">3 JOBS</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Backfilling Service</h3>
          <p className="text-2xl font-bold text-white mt-1">Processing</p>
          <div className="text-xs text-slate-500 mt-2">Est. completion: 2h 15m</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Server className="text-purple-400" size={24} />
            </div>
            <StatusBadge status={EngineStatus.Running} />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Information Gateway</h3>
          <p className="text-2xl font-bold text-white mt-1">Healthy</p>
          <div className="text-xs text-slate-500 mt-2">Avg Latency: 45ms</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Event Throughput (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EVENTS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={{fontSize: 12}} interval={4} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line type="monotone" dataKey="events" stroke="#818cf8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Data Quality Score</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={QUALITY_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false}/>
                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={60} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="valid" fill="#34d399" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#334155' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-sm text-slate-400">
             <span>Site 1</span>
             <span className="text-emerald-400 font-bold">98%</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
             <span>Site 2</span>
             <span className="text-emerald-400 font-bold">92%</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
             <span>Site 3</span>
             <span className="text-emerald-400 font-bold">95%</span>
          </div>
        </div>
      </div>
    </div>
  );
};