import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from "./pages/api-user/page";
import AddUser from "./pages/user/userstable";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/payments" element={<DemoPage />} />
        <Route path="/users" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
