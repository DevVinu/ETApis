export const hiveHardwareData = {
  hiveId: "HIVE-NODE-01",
  location: { lat: 37.7749, lng: -122.4194, address: "Apiary Sector A, North Ridge" },
  security: { tiltStatus: "SECURE", tamperDetected: false, gpsLock: true, satellites: 8 },
  traffic: { exitingToday: 14250, enteringToday: 13980, netActivity: "+270 active foragers" },
  actuators: { sugarPumpState: "STANDBY", lastDispensed: "Yesterday, 18:30", syrupLevelPct: 82 },
  probes: {
    probeTop: "34.2°C",
    probeCore: "35.6°C (Brood Optimal)",
    probeBottom: "32.8°C",
    ambient: "21.5°C"
  }
};

export const hivesList = [
  { id: 'hive-01', name: 'Alpha-01 (Main Brood)', status: 'nominal', temp: '35.4°C', humidity: '62%', weight: '42.8 kg', battery: '4.18V (98%)', health: '98.4%', queen: 'Marked (2025)', node: 'ESP32-S3-A1' },
  { id: 'hive-02', name: 'Orchard-02 (South)', status: 'nominal', temp: '35.1°C', humidity: '64%', weight: '38.2 kg', battery: '4.12V (92%)', health: '96.2%', queen: 'Unmarked', node: 'ESP32-S3-A2' },
  { id: 'hive-03', name: 'Meadow-03 (North)', status: 'warning', temp: '36.8°C', humidity: '51%', weight: '45.0 kg', battery: '3.85V (74%)', health: '84.0%', queen: 'Marked (2024)', node: 'ESP32-S3-A3' },
  { id: 'hive-04', name: 'Apiary-04 (Reserve)', status: 'nominal', temp: '34.9°C', humidity: '60%', weight: '31.5 kg', battery: '4.20V (99%)', health: '99.1%', queen: 'Marked (2025)', node: 'ESP32-S3-A4' },
];

export const tempHumidityData = [
  { time: '00:00', core: 34.2, top: 33.1, bottom: 31.0, humidity: 65 },
  { time: '03:00', core: 34.0, top: 32.8, bottom: 30.5, humidity: 68 },
  { time: '06:00', core: 34.1, top: 33.0, bottom: 30.8, humidity: 66 },
  { time: '09:00', core: 34.8, top: 34.0, bottom: 32.2, humidity: 60 },
  { time: '12:00', core: 35.6, top: 35.2, bottom: 33.8, humidity: 54 },
  { time: '15:00', core: 35.8, top: 35.5, bottom: 34.1, humidity: 52 },
  { time: '18:00', core: 35.2, top: 34.6, bottom: 33.0, humidity: 58 },
  { time: '21:00', core: 34.5, top: 33.5, bottom: 31.5, humidity: 63 },
];

export const weightHistoryData = [
  { day: 'Mon', weight: 39.2 },
  { day: 'Tue', weight: 39.8 },
  { day: 'Wed', weight: 40.5 },
  { day: 'Thu', weight: 41.1 },
  { day: 'Fri', weight: 41.6 },
  { day: 'Sat', weight: 42.2 },
  { day: 'Sun', weight: 42.8 },
];

export const acousticSpectrumData = [
  { freq: '100Hz', intensity: 20 },
  { freq: '200Hz', intensity: 45 },
  { freq: '300Hz', intensity: 85 },
  { freq: '340Hz (Nominal)', intensity: 95 },
  { freq: '450Hz', intensity: 40 },
  { freq: '600Hz', intensity: 25 },
  { freq: '800Hz', intensity: 10 },
  { freq: '1kHz', intensity: 5 },
];

export const systemLogs = [
  { id: 1, level: 'INFO', node: 'NEO-6M-GPS', message: 'GPS fix acquired. Coordinates locked: 37.7749° N, 122.4194° W (8 Sats).', timestamp: '14:25:00' },
  { id: 2, level: 'SUCCESS', node: 'MPU6050-TILT', message: 'Orientation verified. Zero displacement detected.', timestamp: '14:24:10' },
  { id: 3, level: 'INFO', node: 'IR-BEAM-01', message: 'Dual-beam IR counter sync complete. Forager flow normal.', timestamp: '12:05:18' },
  { id: 4, level: 'WARN', node: 'DS18B20-PROBES', message: 'Core temperature probe #2 stable at 35.6°C.', timestamp: '09:40:12' },
];
