import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AssetActions from "./AssetActions";
import AssetHistory from "./AssetHistory";
import AssetPrintDialog from "./AssetPrintDialog";
import AssetMaintenanceDialog from "./AssetMaintenanceDialog";
import {
  QrCode,
  MapPin,
  Calendar,
  User,
  Tag,
  Info,
  FileText,
} from "lucide-react";

interface AssetDetailDialogProps {
  asset?: Asset;
  isOpen?: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  onScheduleMaintenance?: () => void;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  status: "available" | "in-use" | "maintenance" | "retired";
  serialNumber: string;
  purchaseDate: string;
  location: string;
  assignedTo?: {
    name: string;
    avatar?: string;
    initials: string;
    department: string;
  };
  lastMaintenance?: string;
  nextMaintenance?: string;
  notes?: string;
  qrCode?: string;
  image?: string;
  category?: string;
  manufacturer?: string;
  model?: string;
  warrantyExpiration?: string;
  purchasePrice?: number;
  condition?: "excellent" | "good" | "fair" | "poor";
  customFields?: Record<string, string>;
}

const getStatusBadge = (status: Asset["status"]) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    case "in-use":
      return <Badge className="bg-blue-100 text-blue-800">In Use</Badge>;
    case "maintenance":
      return <Badge className="bg-amber-100 text-amber-800">Maintenance</Badge>;
    case "retired":
      return <Badge className="bg-red-100 text-red-800">Retired</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const AssetDetailDialog: React.FC<AssetDetailDialogProps> = ({
  asset = {
    id: "ASSET-001",
    name: "Dell XPS 15 Laptop",
    type: "Computer",
    status: "in-use",
    serialNumber: "XPS15-9570-78901",
    purchaseDate: "2022-05-15",
    location: "Main Office - Floor 2",
    assignedTo: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      initials: "JS",
      department: "Engineering",
    },
    lastMaintenance: "2023-01-10",
    nextMaintenance: "2023-07-10",
    notes: "This laptop has been upgraded with 32GB RAM and 1TB SSD.",
    category: "Electronics",
    manufacturer: "Dell",
    model: "XPS 15 9570",
    warrantyExpiration: "2025-05-15",
    purchasePrice: 1899.99,
    condition: "good",
    customFields: {
      "Asset Tag": "IT-LAPTOP-042",
      "MAC Address": "00:1B:44:11:3A:B7",
    },
  },
  isOpen = true,
  onClose = () => {},
  onEdit = () => {},
  onViewHistory = () => {},
  onPrint = () => {}, // This is already working
  onCheckIn = () => {
    console.log("Check in button clicked");
    window.alert("Asset checked in successfully");
  },
  onCheckOut = () => {
    console.log("Check out button clicked");
    window.alert("Asset checked out successfully");
  },
  onScheduleMaintenance = () => {
    console.log("Schedule maintenance button clicked");
  },
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAsset, setEditedAsset] = useState(asset);
  const isCheckedOut = asset.status === "in-use";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrintClick = () => {
    console.log("Print button clicked");
    setPrintDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditedAsset((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSaveEdit = () => {
    // In a real app, this would save to a database
    console.log("Saving edited asset:", editedAsset);

    // Add to history log
    try {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} - ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;

      const newEvent = {
        id: `edit-${Date.now()}`,
        type: "status-change",
        date: formattedDate,
        title: `Asset Details Updated`,
        description: `Asset information was updated`,
        user: {
          name: "John Doe",
          initials: "JD",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=john`,
        },
      };

      // Get existing events or initialize empty array
      let existingEvents = [];
      try {
        const storedEvents = localStorage.getItem("assetMaintenanceEvents");
        if (storedEvents) {
          existingEvents = JSON.parse(storedEvents);
        }
      } catch (error) {
        console.error("Error retrieving events:", error);
      }

      // Add new event to the beginning of the array
      existingEvents.unshift(newEvent);

      // Store back in localStorage
      localStorage.setItem(
        "assetMaintenanceEvents",
        JSON.stringify(existingEvents),
      );

      // Trigger storage event manually
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error saving event:", error);
    }

    // Show success notification
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "#10b981";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    notification.style.zIndex = "9999";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "8px";
    notification.style.fontWeight = "bold";

    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Asset updated successfully</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedAsset(asset);
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                {asset.name}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <span>ID: {asset.id}</span>
                <span>•</span>
                <span>{asset.type}</span>
                <span>•</span>
                {getStatusBadge(asset.status)}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </DialogHeader>

        <AssetActions
          onEdit={() => setIsEditing(true)}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onScheduleMaintenance={() => setMaintenanceDialogOpen(true)}
          onViewHistory={() => setActiveTab("history")}
          onPrint={handlePrintClick}
          isCheckedOut={isCheckedOut}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg border overflow-hidden">
                  {asset.image ? (
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>

                {asset.assignedTo && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Assigned To
                    </h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          name="assignedTo.name"
                          value={editedAsset.assignedTo?.name || ""}
                          onChange={handleInputChange}
                          placeholder="Name"
                        />
                        <Input
                          name="assignedTo.department"
                          value={editedAsset.assignedTo?.department || ""}
                          onChange={handleInputChange}
                          placeholder="Department"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {asset.assignedTo.avatar ? (
                            <AvatarImage
                              src={asset.assignedTo.avatar}
                              alt={asset.assignedTo.name}
                            />
                          ) : (
                            <AvatarFallback>
                              {asset.assignedTo.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{asset.assignedTo.name}</p>
                          <p className="text-sm text-gray-500">
                            {asset.assignedTo.department}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Asset Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedAsset.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Asset Type</Label>
                        <Input
                          id="type"
                          name="type"
                          value={editedAsset.type}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Serial Number</Label>
                        <Input
                          id="serialNumber"
                          name="serialNumber"
                          value={editedAsset.serialNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Purchase Date</Label>
                        <Input
                          id="purchaseDate"
                          name="purchaseDate"
                          type="date"
                          value={editedAsset.purchaseDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={editedAsset.location}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          name="status"
                          value={editedAsset.status}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="available">Available</option>
                          <option value="in-use">In Use</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="retired">Retired</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="warrantyExpiration">
                          Warranty Expiration
                        </Label>
                        <Input
                          id="warrantyExpiration"
                          name="warrantyExpiration"
                          type="date"
                          value={editedAsset.warrantyExpiration || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <select
                          id="condition"
                          name="condition"
                          value={editedAsset.condition || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                        </select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="manufacturer">Manufacturer</Label>
                          <Input
                            id="manufacturer"
                            name="manufacturer"
                            value={editedAsset.manufacturer || ""}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            name="model"
                            value={editedAsset.model || ""}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            name="category"
                            value={editedAsset.category || ""}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="purchasePrice">
                            Purchase Price ($)
                          </Label>
                          <Input
                            id="purchasePrice"
                            name="purchasePrice"
                            type="number"
                            value={editedAsset.purchasePrice || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={editedAsset.notes || ""}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Tag className="h-4 w-4" /> Serial Number
                        </p>
                        <p>{asset.serialNumber}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Purchase Date
                        </p>
                        <p>{formatDate(asset.purchaseDate)}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> Location
                        </p>
                        <p>{asset.location}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Warranty Expiration
                        </p>
                        <p>{formatDate(asset.warrantyExpiration)}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Info className="h-4 w-4" /> Condition
                        </p>
                        <p className="capitalize">{asset.condition || "N/A"}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Last Maintenance
                        </p>
                        <p>{formatDate(asset.lastMaintenance)}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Manufacturer</p>
                          <p className="text-sm">
                            {asset.manufacturer || "N/A"}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium">Model</p>
                          <p className="text-sm">{asset.model || "N/A"}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium">Category</p>
                          <p className="text-sm">{asset.category || "N/A"}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium">Purchase Price</p>
                          <p className="text-sm">
                            {asset.purchasePrice
                              ? `$${asset.purchasePrice.toFixed(2)}`
                              : "N/A"}
                          </p>
                        </div>

                        {asset.customFields &&
                          Object.entries(asset.customFields).map(
                            ([key, value]) => (
                              <div key={key} className="space-y-1">
                                <p className="text-sm font-medium">{key}</p>
                                <p className="text-sm">{value}</p>
                              </div>
                            ),
                          )}
                      </div>
                    </div>

                    {asset.notes && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Notes
                          </h3>
                          <p className="text-sm whitespace-pre-line">
                            {asset.notes}
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <AssetHistory key={Date.now()} />
          </TabsContent>

          <TabsContent value="documents">
            <div className="p-8 text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No documents attached to this asset</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  console.log("Upload document button clicked");
                  try {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        window.alert(
                          `Document "${file.name}" uploaded successfully`,
                        );
                      }
                    };
                    input.click();
                  } catch (error) {
                    console.error("Error with file upload:", error);
                    window.alert("Document upload simulation successful");
                  }
                }}
              >
                Upload Document
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Print Dialog */}
      <AssetPrintDialog
        isOpen={printDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
        asset={{
          id: asset.id,
          name: asset.name,
          type: asset.type,
          status: asset.status,
          serialNumber: asset.serialNumber,
          location: asset.location,
        }}
      />

      {/* Maintenance Dialog */}
      <AssetMaintenanceDialog
        isOpen={maintenanceDialogOpen}
        onClose={() => setMaintenanceDialogOpen(false)}
        assetId={asset.id}
        assetName={asset.name}
        onSchedule={(data) => {
          console.log("Maintenance scheduled:", data);
          setMaintenanceDialogOpen(false);
          // Add the maintenance task to history by updating the state
          setActiveTab("history");
        }}
      />
    </Dialog>
  );
};

export default AssetDetailDialog;
