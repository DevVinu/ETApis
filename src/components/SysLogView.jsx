import React from 'react';

export default function SysLogView({ systemLogs }) {
  return (
    <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-6 font-mono space-y-4">
      <h2 className="text-sm uppercase tracking-wider text-zinc-300 font-bold">Raw System Event Log</h2>
      <div className="bg-[#090a0f] border border-[#27272a] rounded p-4 text-xs space-y-2 text-zinc-400">
        {systemLogs.map(log => (
          <div key={log.id} className="flex items-start space-x-3 pb-2 border-b border-[#27272a]/50">
            <span className="text-zinc-500">{log.timestamp}</span>
            <span className="text-amber-400">[{log.node}]</span>
            <span className="text-zinc-200">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
