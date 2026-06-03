import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function JalRakshakDashboard() {
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    turbidity: 18,
    temperature: 26,
    quality: 'Safe',
    lastUpdated: 'Just now',
  });

  const [chartData, setChartData] = useState([
    { time: '10:00', turbidity: 12 },
    { time: '10:05', turbidity: 15 },
    { time: '10:10', turbidity: 18 },
    { time: '10:15', turbidity: 14 },
    { time: '10:20', turbidity: 20 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/sensor-data"
        );

        const data = await response.json();

        setSensorData({
          ph: data.ph,
          turbidity: data.turbidity,
          temperature: data.temperature,
          quality: data.status,
          lastUpdated: "Just now"
        });

        setChartData((prev) => [
          ...prev.slice(-4),
          {
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            turbidity: data.turbidity,
          },
        ]);

      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();

    const interval = setInterval(fetchSensorData, 5000);

    return () => clearInterval(interval);

  }, []);

  const isUnsafe = sensorData.turbidity > 20;

  const alerts = isUnsafe
    ? [
        'High turbidity detected',
        'Water may be contaminated',
        'Immediate inspection recommended',
      ]
    : [
        'Water quality stable',
        'No contamination detected',
        'System operating normally',
      ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl font-semibold">Loading JalRakshak Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              JalRakshak Dashboard
            </h1>
            <p className="text-slate-400 mt-3 text-lg">
              Water Monitoring System
            </p>
          </div>

          <div
            className={`rounded-2xl px-6 py-4 border shadow-xl ${
              isUnsafe
                ? 'bg-red-500/20 border-red-500'
                : 'bg-emerald-500/20 border-emerald-500'
            }`}
          >
            <p className="text-sm">System Status</p>
            <h2 className="text-2xl font-bold flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-current animate-pulse"></span>
              {isUnsafe ? 'WARNING' : 'ONLINE'}
            </h2>
          </div>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl hover:scale-105 transition duration-300">
            <p className="text-slate-400 text-sm mb-2">pH Level</p>
            <h2 className="text-5xl font-bold">{sensorData.ph}</h2>
            <p className="text-emerald-400 mt-3">Normal Range</p>
          </div>

          <div
            className={`rounded-3xl p-6 border shadow-2xl hover:scale-105 transition duration-300 ${
              isUnsafe
                ? 'bg-red-950 border-red-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-slate-400 text-sm mb-2">Turbidity</p>
            <h2 className="text-5xl font-bold">{sensorData.turbidity}</h2>
            <p className={`${isUnsafe ? 'text-red-400' : 'text-yellow-400'} mt-3`}>
              NTU
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl hover:scale-105 transition duration-300">
            <p className="text-slate-400 text-sm mb-2">Temperature</p>
            <h2 className="text-5xl font-bold">{sensorData.temperature}°C</h2>
            <p className="text-cyan-400 mt-3">Stable</p>
          </div>

          <div
            className={`rounded-3xl p-6 border shadow-2xl hover:scale-105 transition duration-300 ${
              isUnsafe
                ? 'bg-red-950 border-red-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-slate-400 text-sm mb-2">Water Quality</p>
            <h2
              className={`text-4xl font-bold ${
                isUnsafe ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {sensorData.quality}
            </h2>
            <p className="text-slate-400 mt-3">
              Updated {sensorData.lastUpdated}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Live Water Analysis</h2>
                <p className="text-slate-400 mt-1">
                  Real-time turbidity monitoring
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">LIVE</span>
              </div>
            </div>

            <div className="h-80 bg-slate-950 rounded-2xl border border-slate-800 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="turbidity"
                    stroke="#10b981"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6">Alerts & Insights</h2>

            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 border ${
                    isUnsafe
                      ? 'bg-red-950 border-red-500'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        isUnsafe ? 'bg-red-400' : 'bg-emerald-400'
                      }`}
                    ></div>
                    <p className="text-slate-300">{alert}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-8 rounded-2xl p-5 border ${
                isUnsafe
                  ? 'bg-red-500/20 border-red-500'
                  : 'bg-emerald-500/10 border-emerald-500'
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isUnsafe ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {isUnsafe
                  ? 'Unsafe Water Detected'
                  : 'Water Supply Stable'}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {isUnsafe
                  ? 'Contamination levels exceeded the safety threshold. Immediate inspection is recommended.'
                  : 'Current sensor readings indicate safe and stable water conditions.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-slate-500 text-sm">
          JalRakshak • Smart Water Safety Monitoring • Real Time Analytics
        </div>
      </div>
    </div>
  );
}
