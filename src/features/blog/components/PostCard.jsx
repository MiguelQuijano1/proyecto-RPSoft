// src/features/blog/components/PostCard.jsx
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 h-full cursor-pointer overflow-hidden transform hover:scale-105 hover:-translate-y-2">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl"></div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              Post #{post.id}
            </span>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              👤 Usuario {post.userId}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 capitalize group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h2>
          
          {/* Body */}
          <p className="text-gray-400 text-sm line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {post.body}
          </p>
          
          {/* Footer with arrow */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300 flex items-center">
              Leer más
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            {/* Reading time estimate */}
            <div className="flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2 min
            </div>
          </div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Link>
  );
};

export default PostCard;