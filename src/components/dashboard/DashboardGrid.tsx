import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RecentActivitiesWidget from "./RecentActivitiesWidget";
import MaintenanceAlertsWidget from "./MaintenanceAlertsWidget";
import QRFunctionsWidget from "./QRFunctionsWidget";
import QRCodeGenerator from "../qr/QRCodeGenerator";
import QRCodeScanner from "../qr/QRCodeScanner";

interface DashboardGridProps {
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ className = "" }) => {
  // State for managing dialogs
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [qrDialogMode, setQrDialogMode] = useState<"generate" | "scan">(
    "generate",
  );
  const [assetDetailDialogOpen, setAssetDetailDialogOpen] = useState(false);
  const [assetRegistrationDialogOpen, setAssetRegistrationDialogOpen] =
    useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

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
    // In a real app, we would parse the QR data and fetch the asset details
    setQrDialogOpen(false);
    setSelectedAssetId(data); // Assuming data contains the asset ID
    setAssetDetailDialogOpen(true);
  };

  // Handler for asset registration
  const handleRegisterAssetClick = () => {
    setAssetRegistrationDialogOpen(true);
  };

  // Handler for maintenance task click
  const handleMaintenanceTaskClick = (taskId: string) => {
    // In a real app, we would fetch the asset details associated with this task
    console.log(`Maintenance task clicked: ${taskId}`);
    // For demo purposes, we'll just open the asset detail dialog
    setSelectedAssetId(taskId);
    setAssetDetailDialogOpen(true);
  };

  // Placeholder component for AssetCategoriesWidget
  const AssetCategoriesWidget = () => {
    return (
      <Card className="w-full h-full bg-white p-4">
        <h3 className="text-lg font-bold mb-2">Asset Categories</h3>
        <p className="text-gray-500 mb-4">
          View and manage your asset categories
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Electronics", "Furniture", "Vehicles", "Equipment"].map(
            (category) => (
              <div
                key={category}
                className="p-3 bg-gray-50 rounded-md border hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">{category}</div>
                <div className="text-sm text-gray-500">12 assets</div>
              </div>
            ),
          )}
        </div>
      </Card>
    );
  };

  // Placeholder component for AssetDetailDialog
  const AssetDetailDialog = ({ assetId }: { assetId: string | null }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Asset Details</h2>
        <p>Viewing details for asset ID: {assetId || "Unknown"}</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p>This is a placeholder for the asset detail dialog.</p>
          <p>
            In a real implementation, this would show complete asset
            information.
          </p>
        </div>
      </div>
    );
  };

  // Placeholder component for AssetRegistrationDialog
  const AssetRegistrationDialog = ({
    onComplete,
  }: {
    onComplete: () => void;
  }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Register New Asset</h2>
        <p className="mb-4">Fill in the details to register a new asset</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p>This is a placeholder for the asset registration form.</p>
          <p>
            In a real implementation, this would contain a multi-step
            registration form.
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={onComplete}
          >
            Complete Registration
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-full bg-gray-50 p-6 overflow-auto ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {/* Asset Categories Widget */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <AssetCategoriesWidget />
        </div>

        {/* Recent Activities Widget */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <RecentActivitiesWidget />
        </div>

        {/* Maintenance Alerts Widget */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <MaintenanceAlertsWidget onTaskClick={handleMaintenanceTaskClick} />
        </div>

        {/* QR Functions Widget */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <QRFunctionsWidget
            onGenerateClick={handleGenerateQRClick}
            onScanClick={handleScanQRClick}
          />
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="max-w-3xl">
          {qrDialogMode === "generate" ? (
            <QRCodeGenerator isOpen={qrDialogOpen} />
          ) : (
            <QRCodeScanner
              isOpen={qrDialogOpen}
              onScanSuccess={handleQRScanSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Asset Detail Dialog */}
      <Dialog
        open={assetDetailDialogOpen}
        onOpenChange={setAssetDetailDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <AssetDetailDialog assetId={selectedAssetId} />
        </DialogContent>
      </Dialog>

      {/* Asset Registration Dialog */}
      <Dialog
        open={assetRegistrationDialogOpen}
        onOpenChange={setAssetRegistrationDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <AssetRegistrationDialog
            onComplete={() => setAssetRegistrationDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardGrid;
