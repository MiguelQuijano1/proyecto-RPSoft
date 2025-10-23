// src/features/blog/components/ErrorMsg.jsx
const ErrorMsg = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-md text-center">
        <svg 
          className="w-16 h-16 text-red-500 mx-auto mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        
        <h3 className="text-xl font-bold text-red-800 mb-2">
          ¡Oops! Algo salió mal
        </h3>
        
        <p className="text-red-600 mb-6">
          {message || 'Error al cargar los datos'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMsg;