import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import Header from './Header';
import HiveSelector from './HiveSelector';
import TelemetryDashboard from './TelemetryDashboard';
import NodesManagement from './NodesManagement';
import AcousticsView from './AcousticsView';
import SysLogView from './SysLogView';
import { hivesList, systemLogs } from '../data/mockData';

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

      <Header activeTab={activeTab} setActiveTab={setActiveTab} isRefreshing={isRefreshing} onRefresh={handleRefresh} />

      <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-6 flex-1">
        <HiveSelector
          hivesList={hivesList}
          selectedHive={selectedHive}
          setSelectedHive={setSelectedHive}
          activeHiveData={activeHiveData}
        />

        {activeTab === 'dashboard' && <TelemetryDashboard activeHiveData={activeHiveData} />}
        {activeTab === 'hives' && <NodesManagement hivesList={hivesList} />}
        {activeTab === 'acoustics' && <AcousticsView />}
        {activeTab === 'logs' && <SysLogView systemLogs={systemLogs} />}
      </main>

      <footer className="border-t border-[#27272a] bg-[#0c0d14] py-4 text-center font-mono text-[11px] text-zinc-500">
        APIARY-IOT KERNEL • ESP32 FIRMWARE v2.4 • MQTT BROKER SECURE
      </footer>

    </div>
  );
}
