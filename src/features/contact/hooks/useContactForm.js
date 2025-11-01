// src/features/contact/hooks/useContactForm.js
import { useState, useEffect } from 'react';
import { syncOfflineQueue, getQueueStatus } from '../api/contactApi';

export const useContactForm = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    // Actualizar estado de conexión
    const handleOnline = async () => {
      setIsOnline(true);
      // Intentar sincronizar cola cuando vuelve la conexión
      try {
        const result = await syncOfflineQueue();
        if (result.synced > 0) {
          console.log(`✅ ${result.synced} mensaje(s) sincronizado(s)`);
        }
      } catch (error) {
        console.error('Error al sincronizar cola:', error);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Actualizar contador de cola cada 2 segundos
    const queueInterval = setInterval(() => {
      const status = getQueueStatus();
      setQueueCount(status.count);
    }, 2000);

    // Sincronizar cola al montar el componente
    syncOfflineQueue();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(queueInterval);
    };
  }, []);

  return {
    isOnline,
    queueCount
  };
};