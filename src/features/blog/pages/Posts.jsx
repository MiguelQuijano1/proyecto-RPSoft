// src/features/blog/pages/Posts.jsx
import { useEffect, useState } from 'react';
import { getPosts } from '../api/blogApi';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import { useAuth } from '../../auth/hooks/useAuth';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getPosts(20);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loader message="Cargando posts del blog..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <ErrorMsg message={error} onRetry={fetchPosts} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 left-0 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="animate-slideInLeft">
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <span className="mr-3 text-5xl animate-bounce">📝</span>
                  Blog de Posts
                </h1>
                <p className="text-gray-300">
                  Bienvenido, <span className="font-medium text-blue-400">{user?.name}</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right animate-slideInRight">
                <p className="text-sm text-gray-400">Total de posts</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {posts.length}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative group animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <input
                type="text"
                placeholder="🔍 Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-xl">
                No se encontraron posts con "<span className="text-blue-400 font-medium">{searchTerm}</span>"
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 mb-6 animate-fadeIn">
                Mostrando <span className="text-blue-400 font-bold">{filteredPosts.length}</span> de {posts.length} posts
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.id}
                    className="animate-scaleIn"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Posts;