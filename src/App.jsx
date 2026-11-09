import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity,
  Thermometer,
  Droplets,
  Scale,
  Battery,
  Cpu,
  Radio,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Wifi,
  Server,
  Sliders,
  Terminal,
  ShieldCheck
} from 'lucide-react';

// Real-world IoT Sensor Telemetry Data
const tempHumidityData = [
  { time: '00:00', temp: 34.2, humidity: 65, externalTemp: 18.5 },
  { time: '03:00', temp: 34.0, humidity: 68, externalTemp: 17.2 },
  { time: '06:00', temp: 34.1, humidity: 66, externalTemp: 16.8 },
  { time: '09:00', temp: 34.8, humidity: 60, externalTemp: 21.0 },
  { time: '12:00', temp: 35.6, humidity: 54, externalTemp: 27.5 },
  { time: '15:00', temp: 35.8, humidity: 52, externalTemp: 29.0 },
  { time: '18:00', temp: 35.2, humidity: 58, externalTemp: 24.2 },
  { time: '21:00', temp: 34.5, humidity: 63, externalTemp: 20.1 },
];

const weightHistoryData = [
  { day: 'Mon', weight: 39.2, gain: +0.4 },
  { day: 'Tue', weight: 39.8, gain: +0.6 },
  { day: 'Wed', weight: 40.5, gain: +0.7 },
  { day: 'Thu', weight: 41.1, gain: +0.6 },
  { day: 'Fri', weight: 41.6, gain: +0.5 },
  { day: 'Sat', weight: 42.2, gain: +0.6 },
  { day: 'Sun', weight: 42.8, gain: +0.6 },
];

const acousticSpectrumData = [
  { freq: '100Hz', intensity: 20 },
  { freq: '200Hz', intensity: 45 },
  { freq: '300Hz', intensity: 85 },
  { freq: '340Hz (Nominal)', intensity: 95 },
  { freq: '450Hz', intensity: 40 },
  { freq: '600Hz', intensity: 25 },
  { freq: '800Hz', intensity: 10 },
  { freq: '1kHz', intensity: 5 },
];

const hivesList = [
  { id: 'hive-01', name: 'Alpha-01 (Main Brood)', status: 'nominal', temp: '35.4°C', humidity: '62%', weight: '42.8 kg', battery: '4.18V (98%)', health: '98.4%', queen: 'Marked (2025)', node: 'ESP32-S3-A1' },
  { id: 'hive-02', name: 'Orchard-02 (South)', status: 'nominal', temp: '35.1°C', humidity: '64%', weight: '38.2 kg', battery: '4.12V (92%)', health: '96.2%', queen: 'Unmarked', node: 'ESP32-S3-A2' },
  { id: 'hive-03', name: 'Meadow-03 (North)', status: 'warning', temp: '36.8°C', humidity: '51%', weight: '45.0 kg', battery: '3.85V (74%)', health: '84.0%', queen: 'Marked (2024)', node: 'ESP32-S3-A3' },
  { id: 'hive-04', name: 'Apiary-04 (Reserve)', status: 'nominal', temp: '34.9°C', humidity: '60%', weight: '31.5 kg', battery: '4.20V (99%)', health: '99.1%', queen: 'Marked (2025)', node: 'ESP32-S3-A4' },
];

const systemLogs = [
  { id: 1, level: 'WARN', node: 'ESP32-S3-A3', message: 'Core brood temp threshold exceeded (36.8°C > 36.5°C limit). Check ventilation.', timestamp: '14:22:05' },
  { id: 2, level: 'INFO', node: 'ESP32-S3-A1', message: 'HX711 load cell calibration verified. Delta weight: +600g (Nectar flow detected).', timestamp: '12:05:18' },
  { id: 3, level: 'SUCCESS', node: 'ESP32-S3-A2', message: 'Solar MPPT charger active. Battery state of charge restored to 92%.', timestamp: '09:40:12' },
  { id: 4, level: 'INFO', node: 'ESP32-S3-A1', message: 'MQTT heartbeat ACK received from broker.hivemq.com:1883 (Rtt: 42ms).', timestamp: '08:00:00' },
];

export default function App() {
  const [selectedHive, setSelectedHive] = useState('hive-01');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeHiveData = hivesList.find(h => h.id === selectedHive) || hivesList[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#cbd5e1] font-sans flex flex-col selection:bg-amber-500/30 selection:text-amber-200">

      {/* Top Engineering Navbar */}
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

          {/* Navigation Tabs */}
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

          {/* Status Bar / Actions */}
          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MQTT Connected</span>
            </div>
            <button
              onClick={handleRefresh}
              className={`p-1.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-[#3f3f46] transition-all ${isRefreshing ? 'animate-spin text-amber-400' : ''}`}
              title="Sync Telemetry"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-6 flex-1">

        {/* Node & Hive Selection Header */}
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

          {/* Hive Selector Tabs */}
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

        {/* Tab 1: Telemetry Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Brood Temperature"
                value={activeHiveData.temp}
                unit="°C"
                status="Nominal"
                target="34.5 - 36.0°C"
                icon={<Thermometer size={16} className="text-amber-400" />}
              />
              <MetricCard
                label="Internal Humidity"
                value={activeHiveData.humidity}
                unit="RH"
                status="Stable"
                target="55 - 65% RH"
                icon={<Droplets size={16} className="text-blue-400" />}
              />
              <MetricCard
                label="Total Hive Weight"
                value={activeHiveData.weight}
                unit="kg"
                status="+600g / 24h"
                target="HX711 Precision"
                icon={<Scale size={16} className="text-emerald-400" />}
              />
              <MetricCard
                label="Node Battery / SoC"
                value={activeHiveData.battery}
                unit=""
                status="Solar MPPT"
                target="Health: "
                extra={activeHiveData.health}
                icon={<Battery size={16} className="text-amber-400" />}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Temperature & Humidity Chart */}
              <div className="lg:col-span-2 bg-[#12131c] border border-[#27272a] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">24-Hour Environmental Telemetry</h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">Sensor: DHT22 Internal Brood vs Ambient Outdoor</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-zinc-400">
                    SAMPLE INTERVAL: 15M
                  </span>
                </div>
                <div className="h-72 w-full font-mono text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tempHumidityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#27272a" opacity={0.6} />
                      <XAxis dataKey="time" stroke="#71717a" tickLine={false} />
                      <YAxis stroke="#71717a" tickLine={false} domain={[30, 40]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="temp" name="Brood Temp (°C)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="externalTemp" name="Ambient Temp (°C)" stroke="#38bdf8" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weight Gain Trend */}
              <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">7-Day Mass Delta</h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">Nectar flow tracking</p>
                  </div>
                </div>
                <div className="h-72 w-full font-mono text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weightHistoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#27272a" opacity={0.6} />
                      <XAxis dataKey="day" stroke="#71717a" tickLine={false} />
                      <YAxis stroke="#71717a" tickLine={false} domain={[35, 45]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="weight" name="Weight (kg)" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Bottom Row: Acoustics & Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Acoustics */}
              <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Acoustic Frequency Spectrum</h2>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">MAX9814 Microphone FFT (Nominal Queen Pip: 340Hz)</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    CALM
                  </span>
                </div>
                <div className="h-60 w-full font-mono text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={acousticSpectrumData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#27272a" opacity={0.6} />
                      <XAxis dataKey="freq" stroke="#71717a" tickLine={false} />
                      <YAxis stroke="#71717a" tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="intensity" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Syslog / Alerts */}
              <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-5 flex flex-col justify-between font-mono">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs uppercase tracking-wider text-zinc-400">System Event Log</h2>
                    <span className="text-[10px] text-zinc-500">BUFFER: 256KB</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {systemLogs.map(log => (
                      <div key={log.id} className="p-2.5 rounded bg-[#18181b] border border-[#27272a] flex items-start space-x-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.level === 'WARN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          log.level === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {log.level}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[10px] text-zinc-500">
                            <span>{log.node}</span>
                            <span>{log.timestamp}</span>
                          </div>
                          <p className="text-zinc-300 mt-1 leading-relaxed">{log.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-500">
                  <span>FIRMWARE: ESP-IDF v5.1</span>
                  <span className="text-amber-400 hover:underline cursor-pointer" onClick={() => alert('Exporting syslog dump...')}>Export Dump →</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Nodes Management */}
        {activeTab === 'hives' && (
          <div className="space-y-6 font-mono">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm uppercase tracking-wider text-zinc-300 font-bold">Apiary Node Fleet ({hivesList.length})</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Configured ESP32 remote telemetry units</p>
              </div>
              <button
                onClick={() => alert('Provisioning new node wizard...')}
                className="px-3 py-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs hover:bg-amber-500/20 transition-colors"
              >
                + Provision Node
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hivesList.map(hive => (
                <div key={hive.id} className="bg-[#12131c] border border-[#27272a] rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{hive.node}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      hive.status === 'nominal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {hive.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{hive.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Queen: {hive.queen}</p>
                  </div>
                  <div className="pt-3 border-t border-[#27272a] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px]">TEMP</span>
                      <div className="text-zinc-200">{hive.temp}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px]">HUMIDITY</span>
                      <div className="text-zinc-200">{hive.humidity}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px]">WEIGHT</span>
                      <div className="text-zinc-200">{hive.weight}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px]">BATTERY</span>
                      <div className="text-zinc-200">{hive.battery.split(' ')[0]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Acoustics */}
        {activeTab === 'acoustics' && (
          <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-6 font-mono space-y-4">
            <h2 className="text-sm uppercase tracking-wider text-zinc-300 font-bold">Acoustic Diagnostics & Swarm Warning Array</h2>
            <p className="text-xs text-zinc-500">Real-time FFT audio spectrum processing from MAX9814 microphone modules inside the brood box.</p>
            <div className="p-4 bg-[#18181b] border border-[#27272a] rounded text-xs space-y-2">
              <div className="flex justify-between"><span>Nominal Freq Range:</span> <span className="text-white">180Hz - 380Hz</span></div>
              <div className="flex justify-between"><span>Swarm Piping Freq:</span> <span className="text-amber-400">500Hz - 600Hz</span></div>
              <div className="flex justify-between"><span>Current Peak:</span> <span className="text-emerald-400">340Hz (Normal Foraging / Brood Rearing)</span></div>
            </div>
          </div>
        )}

        {/* Tab 4: Syslog */}
        {activeTab === 'logs' && (
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
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272a] bg-[#0c0d14] py-4 text-center font-mono text-[11px] text-zinc-500">
        APIARY-IOT KERNEL • ESP32 FIRMWARE v2.4 • MQTT BROKER SECURE
      </footer>

    </div>
  );
}

function MetricCard({ label, value, unit, status, target, extra, icon }) {
  return (
    <div className="bg-[#12131c] border border-[#27272a] rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
        <div className="p-1.5 rounded bg-[#18181b] border border-[#27272a]">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between font-mono">
        <div className="text-2xl font-bold text-white tabular-nums">
          {value} <span className="text-xs text-zinc-500 font-normal">{unit}</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-[#27272a]">
        <span>{target}</span>
        {extra && <span className="text-emerald-400">{extra}</span>}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#18181b] border border-[#27272a] p-2.5 rounded shadow-xl font-mono text-xs">
        <div className="text-zinc-400 mb-1">{label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2 text-zinc-200">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.name}:</span>
            <span className="font-bold text-white tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
