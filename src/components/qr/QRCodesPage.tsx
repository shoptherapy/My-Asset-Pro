import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import { QrCode, ScanLine, Download, Printer } from "lucide-react";
import QRCodeDialog from "./QRCodeDialog";
import AssetDetailDialog from "../assets/AssetDetailDialog";

const QRCodesPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  // Mock data for recent QR codes
  const recentQRCodes = [
    {
      id: "QR-001",
      assetId: "ASSET-001",
      assetName: "Dell XPS 15 Laptop",
      generatedDate: "2023-06-15",
      generatedBy: "John Doe",
    },
    {
      id: "QR-002",
      assetId: "ASSET-002",
      assetName: "HP LaserJet Printer",
      generatedDate: "2023-06-10",
      generatedBy: "Sarah Williams",
    },
    {
      id: "QR-003",
      assetId: "ASSET-003",
      assetName: "Conference Room Projector",
      generatedDate: "2023-06-05",
      generatedBy: "Mike Johnson",
    },
    {
      id: "QR-004",
      assetId: "ASSET-004",
      assetName: "Office Chair",
      generatedDate: "2023-05-28",
      generatedBy: "John Doe",
    },
  ];

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
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />

        {/* QR Codes Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">QR Codes</h1>
            <p className="text-gray-500">
              Generate and scan QR codes for asset tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Generate QR Code</h2>
                <QrCode className="text-blue-600" size={24} />
              </div>
              <p className="text-gray-500 mb-4">
                Create QR codes for new or existing assets to enable quick
                scanning and tracking.
              </p>
              <Button onClick={handleGenerateQRClick} className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Scan QR Code</h2>
                <ScanLine className="text-green-600" size={24} />
              </div>
              <p className="text-gray-500 mb-4">
                Scan QR codes to quickly access asset information and perform
                actions.
              </p>
              <Button
                onClick={handleScanQRClick}
                variant="outline"
                className="w-full"
              >
                <ScanLine className="mr-2 h-4 w-4" />
                Scan QR Code
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                Recently Generated QR Codes
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      QR Code ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Asset
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Generated Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Generated By
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentQRCodes.map((qrCode) => (
                    <tr key={qrCode.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">
                        {qrCode.id}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{qrCode.assetName}</div>
                          <div className="text-xs text-gray-500">
                            {qrCode.assetId}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {qrCode.generatedDate}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {qrCode.generatedBy}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

export default QRCodesPage;
