import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, ScanLine, Plus } from "lucide-react";

interface QRFunctionsWidgetProps {
  onGenerateClick?: () => void;
  onScanClick?: () => void;
  recentScans?: Array<{
    id: string;
    name: string;
    timestamp: string;
  }>;
}

const QRFunctionsWidget = ({
  onGenerateClick = () => {},
  onScanClick = () => {},
  recentScans = [
    { id: "1", name: "Office Laptop", timestamp: "2 hours ago" },
    { id: "2", name: "Conference Room Projector", timestamp: "1 day ago" },
    { id: "3", name: "Desk Chair", timestamp: "3 days ago" },
  ],
}: QRFunctionsWidgetProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold">QR Code Functions</CardTitle>
        <CardDescription>
          Generate or scan QR codes for asset management
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={onGenerateClick}
            className="h-20 flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
            variant="outline"
          >
            <QrCode size={24} />
            <span>Generate QR</span>
          </Button>

          <Button
            onClick={onScanClick}
            className="h-20 flex flex-col items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
            variant="outline"
          >
            <ScanLine size={24} />
            <span>Scan QR</span>
          </Button>
        </div>

        {recentScans.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Scans</h4>
            <ul className="space-y-2">
              {recentScans.map((scan) => (
                <li
                  key={scan.id}
                  className="text-sm p-2 bg-gray-50 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium">{scan.name}</span>
                  <span className="text-xs text-gray-500">
                    {scan.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center gap-2 text-blue-600"
          onClick={onGenerateClick}
        >
          <Plus size={16} />
          <span>Register New Asset</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRFunctionsWidget;
