import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext'; // Adjust path
import MainLayout from '@/components/layout/MainLayout'; // Adjust path
import LoginPage from '@/pages/LoginPage'; // Adjust path
import DashboardPage from '@/pages/DashboardPage'; // Adjust path
import PatientsPage from '@/pages/PatientsPage'; // Adjust path
import AppointmentsPage from '@/pages/AppointmentsPage'; // Adjust path
import BillingPage from '@/pages/BillingPage'; // Adjust path
import InventoryPage from '@/pages/InventoryPage'; // Adjust path
import ServicesPage from '@/pages/ServicesPage'; // Adjust path
import SettingsPage from '@/pages/SettingsPage'; // Adjust path

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            {/* You can add child routes for patients, e.g., /patients/:id, /patients/new */}
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          {/* Catch-all or 404 page can be added here */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;