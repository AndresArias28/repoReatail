import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
import { DashboardNew } from './components/DashboardNew';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { SalesMonthNew } from './components/SalesMonthNew';
import { InventoryNew } from './components/InventoryNew';
import { BranchesManagement } from './components/BranchesManagement';
import { RecommendationsNew } from './components/RecommendationsNew';
import { UploadDataNew } from './components/UploadDataNew';
import { Invoices } from './components/Invoices';
import { Settings } from './components/Settings';
import { AdminPage } from './pages/Admin';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardNew />} />
            <Route path="ventas" element={<SalesMonthNew />} />
            <Route path="inventario" element={<InventoryNew />} />
            <Route path="sucursales" element={<BranchesManagement />} />
            <Route path="recomendaciones" element={<RecommendationsNew />} />
            <Route path="facturas" element={<Invoices />} />
            <Route path="carga" element={<UploadDataNew />} />
            <Route path="configuracion" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
