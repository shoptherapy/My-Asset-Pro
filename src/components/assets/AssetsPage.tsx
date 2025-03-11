import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AssetDetailDialog from "./AssetDetailDialog";
import AssetRegistrationDialog from "./AssetRegistrationDialog";

const AssetsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [assetDetailDialogOpen, setAssetDetailDialogOpen] = useState(false);
  const [assetRegistrationDialogOpen, setAssetRegistrationDialogOpen] =
    useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // Mock data for assets
  const assets = [
    {
      id: "ASSET-001",
      name: "Dell XPS 15 Laptop",
      type: "Computer",
      status: "in-use",
      location: "Main Office - Floor 2",
      assignedTo: "John Smith",
      lastUpdated: "2023-05-15",
    },
    {
      id: "ASSET-002",
      name: "HP LaserJet Printer",
      type: "Printer",
      status: "available",
      location: "Main Office - Floor 1",
      assignedTo: "",
      lastUpdated: "2023-04-10",
    },
    {
      id: "ASSET-003",
      name: "Conference Room Projector",
      type: "Equipment",
      status: "maintenance",
      location: "Conference Room A",
      assignedTo: "",
      lastUpdated: "2023-06-01",
    },
    {
      id: "ASSET-004",
      name: "Office Chair",
      type: "Furniture",
      status: "in-use",
      location: "Main Office - Floor 2",
      assignedTo: "Sarah Williams",
      lastUpdated: "2023-03-22",
    },
    {
      id: "ASSET-005",
      name: "iPhone 13 Pro",
      type: "Mobile Device",
      status: "in-use",
      location: "Mobile",
      assignedTo: "Mike Johnson",
      lastUpdated: "2023-05-30",
    },
  ];

  // User information
  const userInfo = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    initials: "JD",
    notificationCount: 3,
  };

  const handleAssetClick = (assetId: string) => {
    setSelectedAssetId(assetId);
    setAssetDetailDialogOpen(true);
  };

  const handleAddAsset = () => {
    setAssetRegistrationDialogOpen(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in-use":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      case "retired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />

        {/* Assets Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Assets</h1>
            <p className="text-gray-500">
              Manage and track all your organization's assets
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input placeholder="Search assets..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
            <Button onClick={handleAddAsset} className="gap-1">
              <Plus size={18} />
              Add Asset
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Asset ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Assigned To
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAssetClick(asset.id)}
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {asset.id}
                      </td>
                      <td className="px-4 py-3 text-sm">{asset.name}</td>
                      <td className="px-4 py-3 text-sm">{asset.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(asset.status)}`}
                        >
                          {asset.status
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{asset.location}</td>
                      <td className="px-4 py-3 text-sm">
                        {asset.assignedTo || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm">{asset.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Dialogs */}
      <AssetDetailDialog
        isOpen={assetDetailDialogOpen}
        onClose={() => setAssetDetailDialogOpen(false)}
      />

      <AssetRegistrationDialog
        isOpen={assetRegistrationDialogOpen}
        onClose={() => setAssetRegistrationDialogOpen(false)}
        onSubmit={(data) => {
          console.log("Asset registration data:", data);
          setAssetRegistrationDialogOpen(false);
        }}
      />
    </div>
  );
};

export default AssetsPage;
