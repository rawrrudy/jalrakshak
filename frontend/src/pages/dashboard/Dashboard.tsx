import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [sensorData, setSensorData] = useState({
    ph: 0,
    temperature: 0,
    turbidity: 0,
    tds: 0,
    waterLevel: 0,
    deviceId: "",
    status: "Loading...",
  });

  useEffect(() => {
    fetch("http://localhost:8000/sensor-data")
      .then((res) => res.json())
      .then((data) => {
        const latest = data[data.length - 1];

        if (!latest) return;

        let status = "Safe";

        if(
          latest.ph < 6.5 ||
          latest.ph > 8.5 ||
          latest.turbidity > 10 ||
          latest.tds > 500 
        ){
          status = "Unsafe";
        }

        setSensorData({
          ph: latest.ph,
          temperature: latest.temperature,
          turbidity: latest.turbidity,
          tds: latest.tds,
          waterLevel: latest.water_level,
          deviceId: latest.device_id,
          status: status,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch sensor data:", err);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            JalRakshak Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Smart Water Monitoring System
          </p>
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl font-semibold"
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Status Banner */}
      <div
        className={`rounded-2xl p-4 mb-8 border ${
          sensorData.status === "Safe"
            ? "bg-green-500/20 border-green-500"
            : "bg-red-500/20 border-red-500"
        }`}
      >
      
        <h2
          className={`text-2xl font-semibold ${
            sensorData.status === "Safe"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          Water Status: {sensorData.status}
        </h2>
        <p className="text-gray-300 mt-1">
          {sensorData.status === "Safe"
            ? "All sensor readings are within safe range."
              : "Warning! Water quality parameters exceed safe limits."}
        </p>

      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* pH */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">pH Level</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.ph}
          </p>
        </div>

        {/* Temperature */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Temperature</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.temperature}°C
          </p>
        </div>

        {/* Turbidity */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Turbidity</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.turbidity} NTU
          </p>
        </div>

        {/* TDS */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">TDS</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.tds} ppm
          </p>
        </div>

        {/* Water Level */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Water Level</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.waterLevel}%
          </p>
        </div>
      </div>

      {/* Device Info */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Device Information
        </h2>

        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-semibold text-white">Device ID:</span>{" "}
            {sensorData.deviceId}
          </p>

          <p>
            <span className="font-semibold text-white">System Status:</span>{" "}
            Online
          </p>

          <p>
            <span className="font-semibold text-white">Last Updated:</span>{" "}
            Just now
          </p>
        </div>
      </div>
    </main>
  );
}