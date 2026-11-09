import React, { memo } from 'react';

// Using memo ensures the component only re-renders if its specific props change
export default function MetricCard({ label, value, unit, status, target, extra, icon, rssi }) {
  return (
    <div className="bg-[#0c0d14] border border-[#27272a] rounded p-4 space-y-2">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-[10px] font-mono uppercase tracking-wider">{label}</span>
        <div className="flex items-center space-x-2">
          {rssi && <div className="text-[9px] text-zinc-600 font-mono">{rssi} dBm</div>}
          <div className="p-1 rounded bg-[#18181b] border border-[#27272a]">{icon}</div>
        </div>
      </div>
      <div className="flex items-baseline justify-between font-mono">
        <div className="text-xl font-bold text-white tabular-nums">
          {value} <span className="text-xs text-zinc-500 font-normal">{unit}</span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
          status === 'Nominal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          {status}
        </span>
      </div>
      {target && (
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-[#27272a]">
          <span>{target}</span>
          {extra && <span className="text-emerald-400">{extra}</span>}
        </div>
      )}
    </div>
  );
}
