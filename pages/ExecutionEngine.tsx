import React from 'react';
import { Play, RotateCcw, Clock, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { MOCK_JOBS } from '../constants';
import { JobStatus } from '../types';

const StatusIcon: React.FC<{ status: JobStatus }> = ({ status }) => {
  switch (status) {
    case JobStatus.Completed: return <CheckCircle size={18} className="text-emerald-400" />;
    case JobStatus.Processing: return <Loader size={18} className="text-amber-400 animate-spin" />;
    case JobStatus.Queued: return <Clock size={18} className="text-slate-400" />;
    case JobStatus.Failed: return <AlertTriangle size={18} className="text-rose-400" />;
  }
};

const ProgressBar: React.FC<{ progress: number; status: JobStatus }> = ({ progress, status }) => {
  let color = 'bg-slate-600';
  if (status === JobStatus.Completed) color = 'bg-emerald-500';
  if (status === JobStatus.Processing) color = 'bg-amber-500';
  if (status === JobStatus.Failed) color = 'bg-rose-500';

  return (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${progress}%` }} />
    </div>
  );
};

export const ExecutionEngine: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Execution Engine</h2>
          <p className="text-slate-400 mt-1">Manage backfilling jobs and recalculation tasks</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20">
          <Play size={16} /> New Backfill Job
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
          <h3 className="font-semibold text-slate-200">Active & Recent Jobs</h3>
          <button className="text-slate-400 hover:text-white transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
        
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900/50 uppercase font-semibold text-xs text-slate-500">
            <tr>
              <th className="px-6 py-3">Job ID</th>
              <th className="px-6 py-3">Asset</th>
              <th className="px-6 py-3">KPI / Attribute</th>
              <th className="px-6 py-3">Time Range</th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {MOCK_JOBS.map((job) => (
              <tr key={job.id} className="hover:bg-slate-800/50 transition-colors">
                 <td className="px-6 py-4 font-mono text-slate-300">{job.id}</td>
                 <td className="px-6 py-4 font-medium text-white">{job.assetName}</td>
                 <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-xs">
                      {job.kpiName}
                    </span>
                 </td>
                 <td className="px-6 py-4">
                   <div className="flex flex-col text-xs">
                     <span>{job.startTime}</span>
                     <span className="opacity-50 text-center mx-auto">↓</span>
                     <span>{job.endTime}</span>
                   </div>
                 </td>
                 <td className="px-6 py-4 w-48">
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-mono w-8 text-right">{job.progress}%</span>
                     <ProgressBar progress={job.progress} status={job.status} />
                   </div>
                 </td>
                 <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                     <StatusIcon status={job.status} />
                     <span className="capitalize">{job.status}</span>
                   </div>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-4">Calculation Sandbox</h3>
            <p className="text-sm text-slate-400 mb-4">
              Test C# expression logic against historical data before deploying.
            </p>
            <div className="h-40 bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-sm text-emerald-400 overflow-y-auto">
               <span className="text-purple-400">var</span> raw = input.GetValue(<span className="text-amber-300">"TIC-101"</span>);<br/>
               <span className="text-purple-400">if</span> (raw &gt; <span className="text-blue-400">100.0</span>) &#123;<br/>
               &nbsp;&nbsp;<span className="text-purple-400">return</span> raw * <span className="text-blue-400">0.95</span>; <span className="text-slate-500">// Correction factor</span><br/>
               &#125;<br/>
               <span className="text-purple-400">return</span> raw;
            </div>
            <div className="mt-4 flex gap-2">
               <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors">Load Sample Data</button>
               <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded transition-colors">Test Run</button>
            </div>
         </div>

         <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-4">Message Engine Config</h3>
            <p className="text-sm text-slate-400 mb-4">
              Route critical alerts to enterprise communication platforms.
            </p>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">T</div>
                    <span className="text-sm font-medium text-slate-200">Microsoft Teams</span>
                  </div>
                  <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">Connected</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-fuchsia-600 rounded flex items-center justify-center font-bold text-white">S</div>
                    <span className="text-sm font-medium text-slate-200">Slack</span>
                  </div>
                  <span className="px-2 py-0.5 text-xs bg-slate-700 text-slate-400 rounded-full">Not Configured</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};