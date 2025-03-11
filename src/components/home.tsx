import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import DashboardGrid from "./dashboard/DashboardGrid";
import QRCodeDialog from "./qr/QRCodeDialog";
import AssetDetailDialog from "./assets/AssetDetailDialog";

const Home: React.FC = () => {
  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // State for dialogs
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrDialogMode, setQrDialogMode] = useState<"generate" | "scan">(
    "generate",
  );
  const [assetDetailDialogOpen, setAssetDetailDialogOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // User information
  const userInfo = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    initials: "JD",
    notificationCount: 3,
  };

  // Handlers for QR functions
  const handleGenerateQRClick = () => {
    setQrDialogMode("generate");
    setQrDialogOpen(true);
  };

  const handleScanQRClick = () => {
    setQrDialogMode("scan");
    setQrDialogOpen(true);
  };

  const handleQRScanSuccess = (data: string) => {
    setQrDialogOpen(false);
    setSelectedAssetId(data);
    setAssetDetailDialogOpen(true);
  };

  // Handler for mobile menu toggle
  const handleMobileMenuClick = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "hidden md:block" : "block"} transition-all duration-300 ease-in-out`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={handleMobileMenuClick}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <DashboardGrid />
        </main>
      </div>

      {/* Dialogs */}
      <QRCodeDialog
        isOpen={qrDialogOpen}
        onOpenChange={setQrDialogOpen}
        defaultTab={qrDialogMode}
        onScanSuccess={handleQRScanSuccess}
      />

      <AssetDetailDialog
        isOpen={assetDetailDialogOpen}
        onClose={() => setAssetDetailDialogOpen(false)}
      />
    </div>
  );
};

export default Home;
