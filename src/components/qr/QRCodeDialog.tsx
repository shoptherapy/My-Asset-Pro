import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QrCode, ScanLine } from "lucide-react";
import QRCodeGenerator from "./QRCodeGenerator";
import QRCodeScanner from "./QRCodeScanner";

interface QRCodeDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "generate" | "scan";
  onScanSuccess?: (data: string) => void;
  onGenerateSuccess?: (data: any) => void;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({
  isOpen = true,
  onOpenChange = () => {},
  defaultTab = "generate",
  onScanSuccess = () => {},
  onGenerateSuccess = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<"generate" | "scan">(defaultTab);

  const handleScanSuccess = (data: string) => {
    onScanSuccess(data);
    // Optionally close the dialog after successful scan
    // onOpenChange(false);
  };

  const handleGenerateSuccess = (data: any) => {
    onGenerateSuccess(data);
    // Keep dialog open to allow user to download/print QR code
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            QR Code Tools
          </DialogTitle>
          <DialogDescription>
            Generate QR codes for assets or scan existing codes to view asset
            details
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "generate" | "scan")}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger
              value="generate"
              className="flex items-center gap-2 py-3"
            >
              <QrCode className="h-4 w-4" />
              Generate QR Code
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex items-center gap-2 py-3">
              <ScanLine className="h-4 w-4" />
              Scan QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-4">
            <QRCodeGenerator
              onGenerate={handleGenerateSuccess}
              isOpen={activeTab === "generate"}
            />
          </TabsContent>

          <TabsContent value="scan" className="mt-4">
            <QRCodeScanner
              onScanSuccess={handleScanSuccess}
              isOpen={activeTab === "scan"}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
