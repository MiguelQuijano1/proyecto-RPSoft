// src/features/blog/components/PostCard.jsx
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Post #{post.id}
          </span>
          <span className="text-xs text-gray-500">
            Usuario {post.userId}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 capitalize">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.body}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
            Leer más →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;