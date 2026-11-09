// src/services/api.js
// This acts as a gateway. When you are ready to connect to your backend,
// you simply update these functions to use 'fetch' or 'mqtt.js'.

import { hiveHardwareData, tempHumidityData, weightHistoryData, systemLogs } from '../data/mockData';

export const getHiveTelemetry = async () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(hiveHardwareData), 300);
  });
};

export const getTelemetryHistory = async () => {
  return { temp: tempHumidityData, weight: weightHistoryData };
};

export const getSystemLogs = async () => {
  return systemLogs;
};

export const triggerActuator = async (action) => {
  console.log(`Sending command to hardware: ${action}`);
  return { success: true, timestamp: new Date().toISOString() };
};
