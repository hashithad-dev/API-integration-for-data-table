import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from "./pages/api-user/page";
import AddUser from "./pages/user/userstable";
import Layout from "./components/Layout/Layout";
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Navigate to={ROUTES.USERS} replace />} />
          <Route path="payments" element={<DemoPage />} />
          <Route path="users" element={<AddUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
