import React, { useState } from 'react';
import { Play, Copy, Terminal } from 'lucide-react';

export const Gateway: React.FC = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.uaf-gateway.local/v1/assets/pump-001/kpi/efficiency');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = () => {
    setIsLoading(true);
    setResponse(null);
    
    // Simulate API delay
    setTimeout(() => {
      setResponse(JSON.stringify({
        assetId: "pump-001",
        name: "Centrifugal Pump 001",
        timestamp: new Date().toISOString(),
        data: {
          efficiency: 84.5,
          status: "Running",
          temperature: 42.1
        },
        metadata: {
          quality: "Good",
          source: "UAF_Calculation_Engine_v2"
        }
      }, null, 2));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Information Gateway</h2>
        <p className="text-slate-400 mt-1">Unified API access point for raw and transformed data.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
            <h3 className="font-bold text-white mb-4">Query Builder</h3>
            
            <div className="flex gap-0 mb-4">
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-slate-900 border border-slate-700 border-r-0 rounded-l-lg px-3 py-2 text-sm font-bold text-emerald-400 focus:outline-none"
              >
                <option>GET</option>
                <option>POST</option>
                <option>GRAPHQL</option>
              </select>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-r-lg px-4 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleExecute}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {isLoading ? 'Executing...' : <><Play size={16} /> Execute Query</>}
              </button>
            </div>
            
            <div className="mt-6">
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Parameters</label>
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-2">
                 <div className="grid grid-cols-3 gap-2 mb-2 p-2 border-b border-slate-800 text-xs text-slate-500">
                    <div>Key</div>
                    <div>Value</div>
                    <div>Description</div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 p-2 text-sm text-slate-300 items-center">
                    <div className="font-mono text-purple-400">range</div>
                    <div className="font-mono">"24h"</div>
                    <div className="text-slate-500 text-xs">Time window</div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 p-2 text-sm text-slate-300 items-center bg-slate-800/30">
                    <div className="font-mono text-purple-400">resolution</div>
                    <div className="font-mono">"15m"</div>
                    <div className="text-slate-500 text-xs">Resample rate</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex-1">
             <h3 className="font-bold text-white mb-4">Documentation</h3>
             <div className="prose prose-invert prose-sm max-w-none">
                <p>
                  The UAF Gateway exposes a RESTful API compliant with OpenAPI 3.0.
                  All responses are wrapped in a standard envelope containing metadata and quality indicators.
                </p>
                <h4 className="text-slate-200 font-medium mt-4">Authentication</h4>
                <p className="text-slate-400">Include your API key in the <code>Authorization</code> header.</p>
                <pre className="bg-slate-950 p-2 rounded text-xs text-slate-300 mt-2">Authorization: Bearer uaf_sk_live_...</pre>
             </div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col font-mono text-sm overflow-hidden shadow-inner">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal size={16} />
              <span>Response Output</span>
            </div>
            {response && (
              <button className="text-slate-500 hover:text-white transition-colors" title="Copy">
                <Copy size={14} />
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-auto">
            {isLoading ? (
               <div className="flex items-center justify-center h-full text-slate-500 animate-pulse">
                  Waiting for response...
               </div>
            ) : response ? (
              <pre className="text-emerald-400 whitespace-pre-wrap">{response}</pre>
            ) : (
              <div className="text-slate-600 italic">
                // Click "Execute Query" to see results...
              </div>
            )}
          </div>
          
          {response && (
             <div className="mt-2 pt-2 border-t border-slate-800 flex gap-4 text-xs text-slate-500">
               <span>Status: <span className="text-emerald-500">200 OK</span></span>
               <span>Time: <span className="text-slate-300">45ms</span></span>
               <span>Size: <span className="text-slate-300">1.2KB</span></span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};