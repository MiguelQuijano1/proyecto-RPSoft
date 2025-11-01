// src/features/contact/components/TextArea.jsx
import { useState } from 'react';

const TextArea = ({ label, error, maxLength = 2000, ...props }) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="group animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <span className={`text-xs ${charCount > maxLength ? 'text-red-400' : 'text-gray-400'}`}>
          {charCount} / {maxLength}
        </span>
      </div>
      <div className="relative">
        <textarea
          {...props}
          maxLength={maxLength}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/10 border ${
            error ? 'border-red-500/50' : 'border-white/20'
          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 resize-none`}
        />
        {error && (
          <div className="absolute right-4 top-4">
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

export default TextArea;