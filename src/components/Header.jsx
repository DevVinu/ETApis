import React from 'react';
import { RefreshCw, Sun, Moon } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isRefreshing, onRefresh }) {
  return (
    <header className="border-b border-[#27272a] bg-[#0c0d14]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
            λ
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm tracking-tight text-white">apiary-iot</span>
            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">v2.4.0-prod</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          {[
            { id: 'dashboard', label: 'telemetry' },
            { id: 'hives', label: 'nodes' },
            { id: 'acoustics', label: 'acoustics' },
            { id: 'logs', label: 'syslog' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#27272a] text-amber-400 border border-[#3f3f46]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
              }`}
            >
              /{tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MQTT Connected</span>
          </div>
          <button
            onClick={onRefresh}
            className={`p-1.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-[#3f3f46] transition-all ${isRefreshing ? 'animate-spin text-amber-400' : ''}`}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
