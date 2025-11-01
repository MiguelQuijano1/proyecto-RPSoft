// src/features/contact/api/contactApi.js
import axios from 'axios';
import { queueStorage, metricsStorage } from '../utils/storage';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// Función para enviar contacto con retry y backoff
export async function sendContact(payload, idempotencyKey) {
  const maxRetries = 2;
  let attempt = 0;
  const headers = { 
    'Idempotency-Key': idempotencyKey,
    'Content-Type': 'application/json'
  };

  while (attempt <= maxRetries) {
    try {
      const t0 = performance.now();
      const response = await api.post('/contact', payload, { 
        headers,
        timeout: 3000 
      });
      const t1 = performance.now();
      
      // Registrar métrica de éxito
      const latency = Math.round(t1 - t0);
      metricsStorage.addSuccess(latency);
      
      return response.data;
    } catch (error) {
      attempt++;
      
      // Si llegamos al máximo de intentos
      if (attempt > maxRetries) {
        // Registrar métrica de fallo
        metricsStorage.addFailure();
        
        // Si es error de red o timeout, guardar en cola offline
        if (!navigator.onLine || error.code === 'ECONNABORTED' || error.response?.status === 503) {
          const queueItem = {
            id: idempotencyKey,
            payload,
            idempotencyKey
          };
          queueStorage.add(queueItem);
          
          throw new Error('Sin conexión. Tu mensaje se guardó y se enviará automáticamente cuando vuelvas a estar online.');
        }
        
        throw error;
      }
      
      // Backoff exponencial: 500ms, 1000ms, 2000ms
      const backoffTime = 500 * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
  }
}

// Función para sincronizar cola offline
export async function syncOfflineQueue() {
  const queue = queueStorage.get();
  
  if (queue.length === 0) return { synced: 0, failed: 0 };
  
  let synced = 0;
  let failed = 0;
  
  for (const item of queue) {
    try {
      await sendContact(item.payload, item.idempotencyKey);
      queueStorage.remove(item.id);
      synced++;
    } catch (error) {
      // Si falla después de 3 intentos, incrementar contador
      queueStorage.updateAttempts(item.id);
      failed++;
      
      // Si ha fallado más de 5 veces, remover de la cola
      if (item.attempts >= 5) {
        queueStorage.remove(item.id);
      }
    }
  }
  
  return { synced, failed };
}

// Función para obtener estado de la cola
export function getQueueStatus() {
  const queue = queueStorage.get();
  return {
    count: queue.length,
    items: queue
  };
}