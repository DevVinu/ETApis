import React from 'react';
import { Server } from 'lucide-react';

export default function HiveSelector({ hivesList, selectedHive, setSelectedHive, activeHiveData }) {
  return (
    <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#18181b] border border-[#27272a] rounded flex items-center justify-center text-amber-400 font-mono font-bold">
          <Server size={18} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-semibold text-white text-sm">{activeHiveData.name}</h1>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              activeHiveData.status === 'nominal'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {activeHiveData.status.toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">
            Node ID: <span className="text-zinc-200">{activeHiveData.node}</span> • Queen: {activeHiveData.queen}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 font-mono text-xs">
        {hivesList.map(hive => (
          <button
            key={hive.id}
            onClick={() => setSelectedHive(hive.id)}
            className={`px-3 py-1.5 rounded border whitespace-nowrap transition-all ${
              selectedHive === hive.id
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                : 'bg-[#18181b] border-[#27272a] text-zinc-400 hover:border-[#3f3f46] hover:text-zinc-200'
            }`}
          >
            {hive.id.toUpperCase()} ({hive.weight})
          </button>
        ))}
      </div>
    </div>
  );
}
