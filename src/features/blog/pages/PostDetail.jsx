// src/features/blog/pages/PostDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, getPostComments } from '../api/blogApi';
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadTime, setLoadTime] = useState(0);

  const fetchPostData = async () => {
    const startTime = Date.now();
    setLoading(true);
    setError(null);

    try {
      const [postData, commentsData] = await Promise.all([
        getPostById(id),
        getPostComments(id)
      ]);
      
      setPost(postData);
      setComments(commentsData);
      setLoadTime(Date.now() - startTime);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loader message="Cargando post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/blog')}
            className="mb-4 flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </button>
          <ErrorMsg message={error} onRetry={fetchPostData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-0 left-1/3 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 right-1/3 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="mb-6 flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl font-medium transition-all duration-300 border border-white/20 hover:border-white/40 group animate-slideInLeft"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al blog
        </button>

        {/* Post Content */}
        <article className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fadeInUp">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-10 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0">
              <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-10 -right-10 animate-pulse"></div>
              <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-10 -left-10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Post #{post.id}
                </span>
                <span className="text-blue-100 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  👤 Usuario {post.userId}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white capitalize leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                {post.body}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6">
              <div className="flex items-center text-gray-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tiempo de carga: <strong className="text-white ml-1">{loadTime}ms</strong></span>
              </div>
              <div className="flex items-center text-gray-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5 mr-2 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span><strong className="text-white mr-1">{comments.length}</strong> comentarios</span>
              </div>
              <div className="flex items-center text-gray-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5 mr-2 text-pink-400 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span><strong className="text-white mr-1">1.2k</strong> vistas</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="px-8 pb-8">
            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <h2 className="text-2xl font-bold text-white mx-4 flex items-center">
                <span className="mr-2">💬</span>
                Comentarios ({comments.length})
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 animate-slideInUp"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:scale-110 transition-transform duration-300">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {comment.name}
                        </h3>
                        <p className="text-sm text-blue-400">{comment.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                      #{comment.id}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PostDetail;