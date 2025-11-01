// src/features/contact/components/StatsPanel.jsx
import { useEffect, useState } from 'react';
import { metricsStorage, queueStorage } from '../utils/storage';

const StatsPanel = () => {
  const [metrics, setMetrics] = useState(metricsStorage.get());
  const [queueCount, setQueueCount] = useState(queueStorage.get().length);
  const [avgLatency, setAvgLatency] = useState(metricsStorage.getAverageLatency());

  useEffect(() => {
    // Actualizar métricas cada 2 segundos
    const interval = setInterval(() => {
      setMetrics(metricsStorage.get());
      setQueueCount(queueStorage.get().length);
      setAvgLatency(metricsStorage.getAverageLatency());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Exitosos',
      value: metrics.success,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Fallidos',
      value: metrics.failed,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Latencia Media',
      value: `${avgLatency}ms`,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      label: 'En Cola',
      value: queueCount,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Estadísticas de Envío
        </h3>
        {queueCount > 0 && (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium animate-pulse">
            {queueCount} pendiente{queueCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">{stat.icon}</div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {metrics.total > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total de envíos:</span>
            <span className="text-white font-semibold">{metrics.total}</span>
          </div>
          {metrics.lastSync && (
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-400">Última sincronización:</span>
              <span className="text-white font-semibold">
                {new Date(metrics.lastSync).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsPanel;