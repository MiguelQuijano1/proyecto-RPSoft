import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { Profile } from './features/profile/pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};