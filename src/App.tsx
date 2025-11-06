import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SalesMonth } from './components/SalesMonth';
import { Inventory } from './components/Inventory';
import { Recommendations } from './components/Recommendations';
import { UploadData } from './components/UploadData';
import { Settings } from './components/Settings';
import { AdminPage } from './pages/Admin';
import { Login } from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ventas" element={<SalesMonth />} />
          <Route path="inventario" element={<Inventory />} />
          <Route path="recomendaciones" element={<Recommendations />} />
          <Route path="carga" element={<UploadData />} />
          <Route path="configuracion" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
