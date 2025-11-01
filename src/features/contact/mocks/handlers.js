// src/features/contact/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw';

export const contactHandlers = [
  // Endpoint POST para enviar contacto
  http.post('/api/contact', async ({ request }) => {
    // Simular latencia de red (300-800ms)
    await delay(Math.random() * 500 + 300);
    
    // Simular 20% de fallas aleatorias
    if (Math.random() < 0.2) {
      return HttpResponse.json(
        { error: 'Temporary failure', message: 'Servicio temporalmente no disponible' },
        { status: 503 }
      );
    }

    // Obtener datos del request
    const body = await request.json();
    
    // Simular respuesta exitosa
    return HttpResponse.json(
      {
        status: 'queued',
        id: crypto.randomUUID(),
        message: 'Mensaje recibido correctamente',
        data: body,
        timestamp: new Date().toISOString()
      },
      { status: 202 }
    );
  }),
];