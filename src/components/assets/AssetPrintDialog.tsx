import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { Printer, Download } from "lucide-react";

interface AssetPrintDialogProps {
  isOpen: boolean;
  onClose: () => void;
  asset: {
    id: string;
    name: string;
    type: string;
    status: string;
    serialNumber?: string;
    location?: string;
  };
}

const AssetPrintDialog: React.FC<AssetPrintDialogProps> = ({
  isOpen,
  onClose,
  asset,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    console.log("Print label button clicked");
    const printContent = document.getElementById("asset-print-content");
    if (!printContent) return;

    const printWindow = window.open("", "", "height=600,width=800");
    if (!printWindow) {
      console.error("Could not open print window");
      window.alert(
        "Print preview could not be opened. Your browser may be blocking pop-ups.",
      );
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Asset Label - ${asset.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .print-container { max-width: 400px; margin: 0 auto; }
            .asset-label { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
            .asset-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            .asset-title { font-size: 24px; font-weight: bold; margin: 0; }
            .asset-id { color: #666; margin: 5px 0; }
            .asset-type { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
            .asset-status { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
            .asset-details { margin-top: 15px; }
            .asset-details p { margin: 5px 0; }
            .qr-container { display: flex; justify-content: center; margin: 15px 0; }
            .print-footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="asset-label">
              <div class="asset-header">
                <div>
                  <h1 class="asset-title">${asset.name}</h1>
                  <p class="asset-id">ID: ${asset.id}</p>
                </div>
                <div>
                  <span class="asset-type">${asset.type}</span>
                  <span class="asset-status" style="margin-left: 5px;">${asset.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                </div>
              </div>
              <div class="qr-container">
                <img src="${document.getElementById("asset-qr-code")?.toDataURL()}" width="150" height="150" />
              </div>
              <div class="asset-details">
                ${asset.serialNumber ? `<p><strong>Serial Number:</strong> ${asset.serialNumber}</p>` : ""}
                ${asset.location ? `<p><strong>Location:</strong> ${asset.location}</p>` : ""}
              </div>
            </div>
            <div class="print-footer">
              <p>Printed on ${new Date().toLocaleDateString()} - AssetTrack System</p>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const handleDownload = () => {
    console.log("Download QR button clicked");
    const canvas = document.getElementById(
      "asset-qr-code",
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error("QR code canvas not found");
      window.alert("Could not find QR code to download");
      return;
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `asset-qr-${asset.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Print Asset Label</DialogTitle>
        </DialogHeader>

        <div
          id="asset-print-content"
          ref={printRef}
          className="bg-white p-6 border rounded-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">{asset.name}</h2>
              <p className="text-sm text-gray-500">ID: {asset.id}</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs">
                {asset.type}
              </span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {asset.status
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <QRCodeCanvas
              id="asset-qr-code"
              value={JSON.stringify({
                id: asset.id,
                name: asset.name,
                type: asset.type,
              })}
              size={150}
              level="H"
              includeMargin
            />
          </div>

          {asset.serialNumber && (
            <p className="text-sm mb-1">
              <span className="font-medium">Serial Number:</span>{" "}
              {asset.serialNumber}
            </p>
          )}

          {asset.location && (
            <p className="text-sm mb-1">
              <span className="font-medium">Location:</span> {asset.location}
            </p>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center gap-2">
          <Button variant="outline" onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="mr-2 h-4 w-4" />
            Print Label
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetPrintDialog;
