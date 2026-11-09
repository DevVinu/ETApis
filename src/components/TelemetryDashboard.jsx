import React, { useState } from 'react';
import {
  Thermometer, Droplets, Scale, Battery, CloudSun,
  MapPin, Shield, Activity, ArrowUpRight, ArrowDownLeft,
  Droplet, Lock, ChevronRight, Sliders, Cpu
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from './MetricCard';
import { tempHumidityData, weightHistoryData, hiveHardwareData } from '../data/mockData';
import { triggerActuator } from '../services/api';

export default function TelemetryDashboard() {
  const [activeSubView, setActiveSubView] = useState('overview');
  const [pumpState, setPumpState] = useState(false);
  const [dispensing, setDispensing] = useState(false);

  const handleDispenseSyrup = async () => {
    setDispensing(true);
    setPumpState(true);
    await triggerActuator('DISPENSE_SUGAR_50ML');
    setTimeout(() => {
      setPumpState(false);
      setDispensing(false);
      alert('Sugar syrup dispensing cycle completed (50ml delivered).');
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* 1. CLEAN STATUS BAR (Collapsible / Glanceable) */}
      <div className="bg-[#0c0d14] border border-[#27272a] rounded p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-white font-bold">Colony Status: NOMINAL</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="text-zinc-400 flex items-center space-x-1">
            <MapPin size={12} className="text-amber-400" />
            <span>Sector A (GPS Locked)</span>
          </div>
        </div>

        {/* Sub-view switcher for progressive disclosure */}
        <div className="flex items-center space-x-1 bg-[#18181b] p-1 rounded border border-[#27272a]">
          <button
            onClick={() => setActiveSubView('overview')}
            className={`px-3 py-1 rounded transition-colors ${activeSubView === 'overview' ? 'bg-[#27272a] text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubView('hardware')}
            className={`px-3 py-1 rounded transition-colors ${activeSubView === 'hardware' ? 'bg-[#27272a] text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'}`}
          >
            Hardware & Actuators
          </button>
        </div>
      </div>

      {/* 2. PRIMARY METRICS (The 4 essential pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Brood Temperature" value={hiveHardwareData.probes.probeCore.split('°')[0]} unit="°C" status="Nominal" target="Target: 35°C" icon={<Thermometer size={14} />} rssi="-42" />
        <MetricCard label="Total Hive Weight" value="42.8" unit="kg" status="+600g" target="HX711 Scale" icon={<Scale size={14} />} rssi="-38" />
        <MetricCard label="Forager Traffic" value="28.2k" unit="bees/day" status="Active" target="Dual IR Sensors" icon={<Activity size={14} />} rssi="-45" />
        <MetricCard label="Battery / Solar" value="4.18V" unit="" status="Charging" target="SoC: 98%" icon={<Battery size={14} />} rssi="-40" />
      </div>

      {/* 3. CONDITIONAL VIEWS (Progressive Disclosure) */}
      {activeSubView === 'overview' ? (
        /* MAIN CHARTS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0c0d14] border border-[#27272a] rounded p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-300">Brood Thermal Regulation (24h)</h2>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">Core probe tracking against ambient changes</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-400">
                DS18B20 Array
              </span>
            </div>
            <div className="h-64 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempHumidityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#27272a" opacity={0.6} />
                  <XAxis dataKey="time" stroke="#71717a" tickLine={false} />
                  <YAxis stroke="#71717a" tickLine={false} domain={[30, 40]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0c0d14', borderColor: '#27272a', fontSize: '11px', borderRadius: '4px' }} />
                  <Line type="monotone" dataKey="core" name="Brood Core (°C)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Summary / Foraging Card */}
          <div className="bg-[#0c0d14] border border-[#27272a] rounded p-5 flex flex-col justify-between font-mono">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-zinc-300 mb-4">Colony Health Insights</h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#12131c] border border-[#27272a] rounded space-y-1">
                  <div className="text-zinc-500 text-[10px]">NET FORAGER ACTIVITY</div>
                  <div className="text-emerald-400 font-bold flex items-center justify-between">
                    <span>+270 Active Foragers</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="p-3 bg-[#12131c] border border-[#27272a] rounded space-y-1">
                  <div className="text-zinc-500 text-[10px]">ANTI-THEFT SENSOR</div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>MPU6050 Stable</span>
                    <Shield size={14} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveSubView('hardware')}
              className="mt-4 w-full py-2 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-zinc-300 rounded text-xs transition-colors flex items-center justify-center space-x-1"
            >
              <span>Manage Hardware & Actuators</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* DETAILED HARDWARE & ACTUATORS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">

          {/* Thermal Probes Detail */}
          <div className="bg-[#0c0d14] border border-[#27272a] rounded p-5 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-zinc-300 font-bold">DS18B20 Probes</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#12131c] border border-[#27272a] rounded flex justify-between">
                <span className="text-zinc-400">Top Super</span>
                <span className="text-white font-bold">{hiveHardwareData.probes.probeTop}</span>
              </div>
              <div className="p-2.5 bg-[#12131c] border border-amber-500/30 rounded flex justify-between bg-amber-500/5">
                <span className="text-amber-300">Brood Core</span>
                <span className="text-amber-300 font-bold">{hiveHardwareData.probes.probeCore}</span>
              </div>
              <div className="p-2.5 bg-[#12131c] border border-[#27272a] rounded flex justify-between">
                <span className="text-zinc-400">Bottom Board</span>
                <span className="text-white font-bold">{hiveHardwareData.probes.probeBottom}</span>
              </div>
            </div>
          </div>

          {/* Syrup Pump Actuator Control */}
          <div className="bg-[#0c0d14] border border-[#27272a] rounded p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs uppercase tracking-wider text-zinc-300 font-bold">Sugar Pump Actuator</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${pumpState ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 animate-pulse' : 'bg-[#18181b] text-zinc-400 border-[#27272a]'}`}>
                  {pumpState ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-4">Manual override feeder pump control.</p>
              <div className="space-y-1 text-xs mb-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Tank Reserve:</span>
                  <span className="text-white font-bold">{hiveHardwareData.actuators.syrupLevelPct}%</span>
                </div>
                <div className="h-1 bg-[#18181b] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${hiveHardwareData.actuators.syrupLevelPct}%` }}></div>
                </div>
              </div>
            </div>
            <button
              onClick={handleDispenseSyrup}
              disabled={dispensing}
              className={`w-full py-2 rounded text-xs font-bold border transition-all flex items-center justify-center space-x-2 ${
                dispensing ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 cursor-not-allowed' : 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400'
              }`}
            >
              <Droplet size={14} />
              <span>{dispensing ? 'Dispensing...' : 'Dispense 50ml Syrup'}</span>
            </button>
          </div>

          {/* Security & GPS Diagnostics */}
          <div className="bg-[#0c0d14] border border-[#27272a] rounded p-5 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-zinc-300 font-bold">Security & Hardware Node</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#12131c] border border-[#27272a] rounded flex justify-between">
                <span className="text-zinc-400">GPS Status</span>
                <span className="text-emerald-400">Locked (8 Satellites)</span>
              </div>
              <div className="p-2.5 bg-[#12131c] border border-[#27272a] rounded flex justify-between">
                <span className="text-zinc-400">Tilt Sensor</span>
                <span className="text-emerald-400">0.02° Deviation</span>
              </div>
              <div className="p-2.5 bg-[#12131c] border border-[#27272a] rounded flex justify-between">
                <span className="text-zinc-400">MCU Firmware</span>
                <span className="text-zinc-200">ESP32-S3 v2.4</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
