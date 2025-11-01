// src/features/contact/components/TextField.jsx
const TextField = ({ label, error, icon, ...props }) => {
  return (
    <div className="group animate-fadeIn">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-white/10 border ${
            error ? 'border-red-500/50' : 'border-white/20'
          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20`}
        />
        {error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 animate-shake">{error}</p>
      )}
    </div>
  );
};

export default TextField;