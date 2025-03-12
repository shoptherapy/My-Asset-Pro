import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AssetsPage from "./components/assets/AssetsPage";
import MaintenancePage from "./components/maintenance/MaintenancePage";
import QRCodesPage from "./components/qr/QRCodesPage";
import UsersPage from "./components/users/UsersPage";
import SettingsPage from "./components/settings/SettingsPage";
import routes from "tempo-routes";

function App() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      {tempoRoutes}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="qr-codes" element={<QRCodesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        {import.meta.env.VITE_TEMPO === "true" && (
          <Route path="tempobook/*" element={null} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
