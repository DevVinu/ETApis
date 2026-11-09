import React from 'react';

export default function AcousticsView() {
  return (
    <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-6 font-mono space-y-4">
      <h2 className="text-sm uppercase tracking-wider text-zinc-300 font-bold">Acoustic Diagnostics & Swarm Warning Array</h2>
      <p className="text-xs text-zinc-500">Real-time FFT audio spectrum processing from MAX9814 microphone modules inside the brood box.</p>
      <div className="p-4 bg-[#18181b] border border-[#27272a] rounded text-xs space-y-2">
        <div className="flex justify-between"><span>Nominal Freq Range:</span> <span className="text-white">180Hz - 380Hz</span></div>
        <div className="flex justify-between"><span>Swarm Piping Freq:</span> <span className="text-amber-400">500Hz - 600Hz</span></div>
        <div className="flex justify-between"><span>Current Peak:</span> <span className="text-emerald-400">340Hz (Normal Foraging / Brood Rearing)</span></div>
      </div>
    </div>
  );
}
