import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DemoPage from "./components/payments/page";
import AddUser from "./components/New/addtable";
import Navbar from "./components/Layout/Navbar";

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
