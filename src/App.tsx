import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from './store/authStore';
import DemoPage from "./pages/product/page";
import AddUser from "./pages/user/userstable";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Inquiry from "./pages/Inquiry";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login and Register/Login";
import Register from "./pages/Login and Register/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { ROUTES } from './constants/routes';

function AppContent() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
            credentials: 'include'
          })
          
          if (!response.ok) {
            useAuthStore.getState().logout()
            toast.error('Session expired. Please login again.')
            navigate('/login')
          }
        } catch (error) {
          useAuthStore.getState().logout()
          navigate('/login')
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAuthenticated, navigate])

  return (
    <Routes>
        {/* <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Navigate to={ROUTES.USERS} replace />} />
          <Route path="payments" element={<DemoPage />} />
          <Route path="users" element={<AddUser />} />
        </Route> */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="api-users" element={<DemoPage />} />
          <Route path="local-users" element={<AddUser />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster position="bottom-center" richColors />
    </BrowserRouter>
  );
}

export default App;
