import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Edit,
  Clipboard,
  Calendar,
  History,
  CheckCircle,
  XCircle,
  Printer,
  Download,
  Share2,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface AssetActionsProps {
  onEdit?: () => void;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  onScheduleMaintenance?: () => void;
  onViewHistory?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  isCheckedOut?: boolean;
}

const AssetActions = ({
  onEdit = () => {
    console.log("Edit button clicked");
    window.alert("Edit functionality triggered");
  },
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
    window.alert("Maintenance scheduled successfully");
  },
  onViewHistory = () => {
    console.log("View history button clicked");
    window.alert("Viewing asset history");
  },
  onPrint = () => {},
  onDownload = () => {
    // Create a sample asset tag data
    const assetTagData = {
      id: "ASSET-001",
      name: "Dell XPS 15 Laptop",
      type: "Computer",
      serialNumber: "XPS15-9570-78901",
    };

    // Generate QR code canvas
    const canvas = document.createElement("canvas");
    const qr = new QRCodeCanvas({
      value: JSON.stringify(assetTagData),
      size: 150,
      level: "H",
      includeMargin: true,
    });

    // Render QR code to canvas
    qr.toCanvas(canvas, (error) => {
      if (error) {
        console.error("Error generating QR code:", error);
        window.alert("Error generating asset tag QR code");
        return;
      }

      // Convert canvas to data URL and download
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `asset-tag-${assetTagData.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },
  onShare = () => {
    console.log("Share button clicked");
    window.alert("Asset information shared successfully");
  },
  isCheckedOut = false,
}: AssetActionsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-white border rounded-md shadow-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Asset</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={isCheckedOut ? onCheckIn : onCheckOut}
            >
              {isCheckedOut ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCheckedOut ? "Check In Asset" : "Check Out Asset"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onScheduleMaintenance}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Schedule Maintenance</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onViewHistory}>
              <History className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View History</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onPrint}>
              <Printer className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Print Asset Details</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Asset Information</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share Asset</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AssetActions;
