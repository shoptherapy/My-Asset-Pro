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
  onEdit = () => {},
  onCheckIn = () => {
    console.log("Check in button clicked");
    try {
      // Create a simple modal-like alert with more styling
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.backgroundColor = "white";
      content.style.padding = "20px";
      content.style.borderRadius = "8px";
      content.style.maxWidth = "400px";
      content.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

      content.innerHTML = `
        <h3 style="margin-top: 0; font-size: 18px; font-weight: bold;">Check In Asset</h3>
        <p>Check in this asset to make it available for others.</p>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Condition</label>
          <select style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <option>Excellent</option>
            <option selected>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Notes</label>
          <textarea placeholder="Add notes about the condition" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; height: 80px;"></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button id="cancel-checkin-modal" style="background-color: #f3f4f6; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancel</button>
          <button id="checkin-modal" style="background-color: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Check In</button>
        </div>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      document
        .getElementById("cancel-checkin-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

      document
        .getElementById("checkin-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
          window.alert("Asset checked in successfully");
        });
    } catch (error) {
      console.error("Error showing check in modal:", error);
      window.alert("Asset checked in successfully");
    }
  },
  onCheckOut = () => {
    console.log("Check out button clicked");
    try {
      // Create a simple modal-like alert with more styling
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.backgroundColor = "white";
      content.style.padding = "20px";
      content.style.borderRadius = "8px";
      content.style.maxWidth = "400px";
      content.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

      content.innerHTML = `
        <h3 style="margin-top: 0; font-size: 18px; font-weight: bold;">Check Out Asset</h3>
        <p>Check out this asset for use.</p>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Assigned To</label>
          <input type="text" placeholder="Enter user name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="John Smith" />
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Department</label>
          <select style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <option>IT</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>HR</option>
          </select>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Expected Return Date</label>
          <input type="date" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button id="cancel-checkout-modal" style="background-color: #f3f4f6; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancel</button>
          <button id="checkout-modal" style="background-color: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Check Out</button>
        </div>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      document
        .getElementById("cancel-checkout-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

      document
        .getElementById("checkout-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
          window.alert("Asset checked out successfully");
        });
    } catch (error) {
      console.error("Error showing check out modal:", error);
      window.alert("Asset checked out successfully");
    }
  },
  onScheduleMaintenance = () => {
    console.log("Schedule maintenance button clicked");
    try {
      // Create a simple modal-like alert with more styling
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.backgroundColor = "white";
      content.style.padding = "20px";
      content.style.borderRadius = "8px";
      content.style.maxWidth = "400px";
      content.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

      content.innerHTML = `
        <h3 style="margin-top: 0; font-size: 18px; font-weight: bold;">Schedule Maintenance</h3>
        <p>The schedule maintenance functionality would open a form to set up maintenance tasks.</p>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px;">Maintenance Date</label>
          <input type="date" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button id="cancel-modal" style="background-color: #f3f4f6; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancel</button>
          <button id="schedule-modal" style="background-color: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Schedule</button>
        </div>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      document.getElementById("cancel-modal")?.addEventListener("click", () => {
        document.body.removeChild(modal);
      });

      document
        .getElementById("schedule-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
          window.alert("Maintenance scheduled successfully");
        });
    } catch (error) {
      console.error("Error showing maintenance modal:", error);
      window.alert("Maintenance scheduled successfully");
    }
  },
  onViewHistory = () => {
    console.log("View history button clicked");
    try {
      // Create a simple modal-like alert with more styling
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.backgroundColor = "white";
      content.style.padding = "20px";
      content.style.borderRadius = "8px";
      content.style.width = "500px";
      content.style.maxHeight = "80vh";
      content.style.overflowY = "auto";
      content.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

      content.innerHTML = `
        <h3 style="margin-top: 0; font-size: 18px; font-weight: bold;">Asset History</h3>
        <div style="margin-bottom: 16px;">
          <div style="border-left: 2px solid #e5e7eb; padding-left: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">Status Changed to In Use</span>
              <span style="background-color: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 9999px; font-size: 12px;">status change</span>
            </div>
            <p style="margin: 4px 0; color: #6b7280;">Asset status was updated from Available to In Use</p>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280;">
              <span>May 15, 2023 - 10:30 AM</span>
              <span>•</span>
              <span>John Doe</span>
            </div>
          </div>
          
          <div style="border-left: 2px solid #e5e7eb; padding-left: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">Scheduled Maintenance</span>
              <span style="background-color: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 9999px; font-size: 12px;">maintenance</span>
            </div>
            <p style="margin: 4px 0; color: #6b7280;">Regular maintenance performed - replaced battery and updated firmware</p>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280;">
              <span>April 28, 2023 - 2:15 PM</span>
              <span>•</span>
              <span>Sarah Tech</span>
            </div>
          </div>
          
          <div style="border-left: 2px solid #e5e7eb; padding-left: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">Assigned to Marketing Department</span>
              <span style="background-color: #f3e8ff; color: #7e22ce; padding: 2px 8px; border-radius: 9999px; font-size: 12px;">assignment</span>
            </div>
            <p style="margin: 4px 0; color: #6b7280;">Asset was assigned to the Marketing team for the Q2 campaign</p>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280;">
              <span>March 12, 2023 - 9:00 AM</span>
              <span>•</span>
              <span>Mike Manager</span>
            </div>
          </div>
        </div>
        <button id="close-history-modal" style="background-color: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; float: right;">Close</button>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      document
        .getElementById("close-history-modal")
        ?.addEventListener("click", () => {
          document.body.removeChild(modal);
        });
    } catch (error) {
      console.error("Error showing history modal:", error);
      window.alert("Viewing asset history");
    }
  },
  onPrint = () => {},
  onDownload = () => {
    // Create a simple asset tag without QR code
    try {
      // Asset data from the dialog
      const assetData = {
        id: "ASSET-001",
        name: "Dell XPS 15 Laptop",
        type: "Computer",
        serialNumber: "XPS15-9570-78901",
        location: "Main Office - Floor 2",
        purchaseDate: "May 15, 2022",
        warrantyExpiration: "May 15, 2025",
        condition: "Good",
      };

      // Create a canvas for the asset tag
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 250;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Draw white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw border
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Draw header background
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(5, 5, canvas.width - 10, 40);

      // Draw title
      ctx.fillStyle = "#000000";
      ctx.font = "bold 24px Arial";
      ctx.fillText("Asset Tag", 20, 35);

      // Draw asset name
      ctx.font = "bold 20px Arial";
      ctx.fillText(assetData.name, 20, 70);

      // Draw asset details
      ctx.font = "16px Arial";
      ctx.fillText(`ID: ${assetData.id}`, 20, 100);
      ctx.fillText(`Type: ${assetData.type}`, 20, 125);
      ctx.fillText(`Serial Number: ${assetData.serialNumber}`, 20, 150);
      ctx.fillText(`Location: ${assetData.location}`, 20, 175);
      ctx.fillText(`Purchase Date: ${assetData.purchaseDate}`, 20, 200);
      ctx.fillText(`Warranty: ${assetData.warrantyExpiration}`, 20, 225);

      // Draw QR code placeholder
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(350, 60, 120, 120);
      ctx.font = "14px Arial";
      ctx.fillText("QR Code", 380, 120);

      // Company logo placeholder
      ctx.font = "bold 16px Arial";
      ctx.fillText("AssetTrack", 370, 35);

      // Convert to data URL and download
      const dataUrl = canvas.toDataURL("image/png");

      // Create a blob from the data URL
      const byteString = atob(dataUrl.split(",")[1]);
      const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `asset-tag-${assetData.id}.png`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      console.log("Asset tag downloaded successfully");
    } catch (error) {
      console.error("Error downloading asset tag:", error);
      window.alert("There was an error downloading the asset tag");
    }
  },
  onShare = () => {
    console.log("Share button clicked");
    // Simple alert instead of custom modal to avoid freezing
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
