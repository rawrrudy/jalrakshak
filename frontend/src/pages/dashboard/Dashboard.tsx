import { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type HistoryPoint = {
  time: number;
  temperature: number;
  ph: number;
  tds: number;
  turbidity: number;
};

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

  const [history, setHistory] = useState<HistoryPoint[]>([]);

  const [recentReadings, setRecentReadings] = useState<any[]>([]);

  const [waterScore, setWaterScore] = useState(100);

  const sensorLocation = {
    lat: 18.5204,
    lng: 73.8567,
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/sensor-data")
        .then((res) => res.json())
        .then((data) => {
          const latest = data[data.length - 1];

          if (!latest) return;

          let status = "Safe";

          let score = 100;

          if (latest.ph < 6.5 || latest.ph > 8.5)
            score -= 30;

          if (latest.tds > 500)
            score -= 25;

          if (latest.turbidity > 10)
            score -= 25;

          if (latest.temperature > 35)
            score -= 20;

          if (score < 0)
            score = 0;

          if (
            latest.ph < 6.5 ||
            latest.ph > 8.5 ||
            latest.turbidity > 10 ||
            latest.tds > 500
          ) {
            status = "Unsafe";
          }

          setSensorData({
            ph: latest.ph,
            temperature: latest.temperature,
            turbidity: latest.turbidity,
            tds: latest.tds,
            waterLevel: latest.water_level,
            deviceId: latest.device_id,
            status,
          });

          setWaterScore(score);

          setHistory(
            data.slice(-20).map((item: any, index: number) => ({
              time: index + 1,
              temperature: item.temperature,
              ph: item.ph,
              tds: item.tds,
              turbidity: item.turbidity,
            }))
          );

          setRecentReadings(data.slice(-10).reverse());
        })
        .catch((err) => {
          console.error("Failed to fetch sensor data:", err);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
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

      {/* Water Score */}
      <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
      
        <h2 className="text-xl font-semibold text-gray-300 mb-2">
          Water Quality Score
        </h2>

        <div
          className={`text-6xl font-bold ${
            waterScore >= 80
              ? "text-green-400"
              : waterScore >= 50
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {waterScore}
        </div>

        <p className="mt-2 text-lg">
          {waterScore >= 80
            ? "Excellent"
            : waterScore >= 50
            ? "Fair"
            : "Poor"}
        </p>

      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">pH Level</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.ph}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Temperature</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.temperature}°C
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Turbidity</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.turbidity} NTU
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">TDS</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.tds} ppm
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm mb-2">Water Level</h3>
          <p className="text-4xl font-bold text-cyan-400">
            {sensorData.waterLevel}
          </p>
        </div>
      </div>

      {/* Device Information */}
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
            Auto-refreshing every 5 seconds
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

      {/* Temperature Trend */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Temperature Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#22d3ee"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*pH Trend*/}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          pH Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ph"
              stroke="#22d3ee"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*TDS Trend*/}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          TDS Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tds"
              stroke="#22d3ee"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*Turbidity Trend*/}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Turbidity Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="turbidity"
              stroke="#22d3ee"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* Map */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Water Body Monitoring Map
        </h2>

        <div className="rounded-xl overflow-hidden">
          <MapContainer
            center={[sensorLocation.lat, sensorLocation.lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[sensorLocation.lat, sensorLocation.lng]}>
              <Popup>
                <strong>{sensorData.deviceId}</strong>
                <br />
                Status: {sensorData.status}
                <br />
                pH: {sensorData.ph}
                <br />
                Temperature: {sensorData.temperature}
                <br />
                TDS: {sensorData.tds}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          Recent Readings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-2">Device</th>
                <th className="p-2">pH</th>
                <th className="p-2">Temp</th>
                <th className="p-2">TDS</th>
                <th className="p-2">Turbidity</th>
                <th className="p-2">Water Level</th>
              </tr>
            </thead>

            <tbody>
              {recentReadings.map((reading, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5"
                >
                  <td className="p-2">{reading.device_id}</td>
                  <td className="p-2">{reading.ph}</td>
                  <td className="p-2">{reading.temperature} C</td>
                  <td className="p-2">{reading.tds}</td>
                  <td className="p-2">{reading.turbidity}</td>
                  <td className="p-2">{reading.water_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}