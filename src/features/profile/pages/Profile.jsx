import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return <div className="p-8 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-blue-100">Información de tu cuenta</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Nombre Completo</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Usuario</p>
                <p className="text-lg font-semibold text-gray-800">{user.user_name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                <p className="text-lg font-semibold text-gray-800">{user.phone}</p>
              </div>
              {user.role && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Rol</p>
                  <p className="text-lg font-semibold text-gray-800">{user.role.name}</p>
                </div>
              )}
              {user.country && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">País</p>
                  <p className="text-lg font-semibold text-gray-800">{user.country.name}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};