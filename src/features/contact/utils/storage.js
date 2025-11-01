// src/features/contact/utils/storage.js

const QUEUE_KEY = 'contact_queue';
const METRICS_KEY = 'contact_metrics';

// Gestión de cola offline
export const queueStorage = {
  get: () => {
    try {
      const data = localStorage.getItem(QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  add: (item) => {
    const queue = queueStorage.get();
    queue.push({
      ...item,
      createdAt: new Date().toISOString(),
      attempts: 0
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    return queue;
  },

  remove: (id) => {
    const queue = queueStorage.get();
    const filtered = queue.filter(item => item.id !== id);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
    return filtered;
  },

  clear: () => {
    localStorage.removeItem(QUEUE_KEY);
  },

  updateAttempts: (id) => {
    const queue = queueStorage.get();
    const updated = queue.map(item => 
      item.id === id ? { ...item, attempts: item.attempts + 1 } : item
    );
    localStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
    return updated;
  }
};

// Gestión de métricas
export const metricsStorage = {
  get: () => {
    try {
      const data = localStorage.getItem(METRICS_KEY);
      return data ? JSON.parse(data) : {
        total: 0,
        success: 0,
        failed: 0,
        latencies: [],
        lastSync: null
      };
    } catch {
      return {
        total: 0,
        success: 0,
        failed: 0,
        latencies: [],
        lastSync: null
      };
    }
  },

  addSuccess: (latency) => {
    const metrics = metricsStorage.get();
    metrics.total += 1;
    metrics.success += 1;
    metrics.latencies.push(latency);
    // Mantener solo últimas 20 latencias
    if (metrics.latencies.length > 20) {
      metrics.latencies.shift();
    }
    metrics.lastSync = new Date().toISOString();
    localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
    return metrics;
  },

  addFailure: () => {
    const metrics = metricsStorage.get();
    metrics.total += 1;
    metrics.failed += 1;
    localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
    return metrics;
  },

  getAverageLatency: () => {
    const metrics = metricsStorage.get();
    if (metrics.latencies.length === 0) return 0;
    const sum = metrics.latencies.reduce((a, b) => a + b, 0);
    return Math.round(sum / metrics.latencies.length);
  },

  reset: () => {
    localStorage.removeItem(METRICS_KEY);
  }
};