import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { InformationModel } from './pages/InformationModel';
import { ExecutionEngine } from './pages/ExecutionEngine';
import { Gateway } from './pages/Gateway';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/model" element={<InformationModel />} />
          <Route path="/engine" element={<ExecutionEngine />} />
          <Route path="/gateway" element={<Gateway />} />
          <Route path="/settings" element={<div className="p-8 text-slate-400">Configuration Settings Placeholder</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;