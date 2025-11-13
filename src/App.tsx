import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import DemoPage from "./pages/api-user/page";
import AddUser from "./pages/user/userstable";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
      <Toaster position="bottom-center" richColors />
    </BrowserRouter>
  );
}

export default App;
