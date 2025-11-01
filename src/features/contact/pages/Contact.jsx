// src/features/contact/pages/Contact.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../utils/validationSchema';
import { sendContact } from '../api/contactApi';
import { useContactForm } from '../hooks/useContactForm';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import StatsPanel from '../components/StatsPanel';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const { isOnline, queueCount } = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    const idempotencyKey = crypto.randomUUID();

    try {
      await sendContact(data, idempotencyKey);
      setSubmitStatus({
        type: 'success',
        message: '¡Mensaje enviado correctamente! Te responderemos pronto.'
      });
      reset();
      
      // Scroll suave hacia arriba para ver el mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Ocurrió un error. Por favor intenta nuevamente.'
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-all duration-300 hover:scale-110">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o proyecto en mente? Envíanos un mensaje y te responderemos lo antes posible.
          </p>

          {/* Connection Status Badge */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isOnline 
                ? 'bg-green-500/20 border border-green-500/50' 
                : 'bg-red-500/20 border border-red-500/50'
            } backdrop-blur-sm`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className={`text-sm font-medium ${isOnline ? 'text-green-300' : 'text-red-300'}`}>
                {isOnline ? 'Conectado' : 'Sin conexión'}
              </span>
            </div>
            
            {queueCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50 backdrop-blur-sm animate-pulse">
                <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-yellow-300">
                  {queueCount} mensaje{queueCount !== 1 ? 's' : ''} en cola
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Panel */}
        <StatsPanel />

        {/* Success/Error Message */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-xl backdrop-blur-xl border ${
            submitStatus.type === 'success' 
              ? 'bg-green-500/20 border-green-500/50' 
              : 'bg-red-500/20 border-red-500/50'
          } animate-slideDown`}>
            <div className="flex items-center">
              {submitStatus.type === 'success' ? (
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className={`${submitStatus.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                {submitStatus.message}
              </p>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fadeInUp">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <TextField
                label="Nombre completo"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                placeholder="Juan Pérez"
                error={errors.name?.message}
                required
                {...register('name')}
              />

              {/* Email Field */}
              <TextField
                label="Correo electrónico"
                type="email"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                placeholder="tu@email.com"
                error={errors.email?.message}
                required
                {...register('email')}
              />

              {/* Subject Field */}
              <TextField
                label="Asunto"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
                placeholder="¿En qué podemos ayudarte?"
                error={errors.subject?.message}
                required
                {...register('subject')}
              />

              {/* Budget Field (Optional) */}
              <TextField
                label="Presupuesto estimado (opcional)"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                placeholder="$5,000 - $10,000"
                error={errors.budget?.message}
                {...register('budget')}
              />

              {/* Message Field */}
              <TextArea
                label="Mensaje"
                placeholder="Cuéntanos más sobre tu proyecto o consulta..."
                rows={6}
                maxLength={2000}
                error={errors.message?.message}
                required
                {...register('message')}
              />

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-3 group">
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register('consent')}
                    className="w-5 h-5 bg-white/10 border-2 border-white/20 rounded focus:ring-2 focus:ring-blue-500 text-blue-600 cursor-pointer transition-all duration-300"
                  />
                </div>
                <label htmlFor="consent" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-300">
                  Acepto la{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                    política de privacidad
                  </a>{' '}
                  y el tratamiento de mis datos personales
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-red-400 animate-shake">{errors.consent.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar Mensaje
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Respuesta rápida</h3>
            <p className="text-gray-400 text-sm">Respondemos en menos de 24 horas hábiles</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Datos seguros</h3>
            <p className="text-gray-400 text-sm">Tu información está protegida y encriptada</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Sin compromiso</h3>
            <p className="text-gray-400 text-sm">Consulta gratis sin ninguna obligación</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Contact;