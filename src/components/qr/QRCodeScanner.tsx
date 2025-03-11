import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QRCodeScannerProps {
  onScanSuccess?: (data: string) => void;
  onScanError?: (error: string) => void;
  isOpen?: boolean;
}

const QRCodeScanner = ({
  onScanSuccess = () => {},
  onScanError = () => {},
  isOpen = true,
}: QRCodeScannerProps) => {
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock function to simulate QR code scanning
  const mockScanQRCode = () => {
    setIsScanning(true);
    // Simulate processing time
    setTimeout(() => {
      setIsScanning(false);
      // Simulate successful scan
      onScanSuccess("ASSET-1234-5678-90AB");
    }, 2000);
  };

  useEffect(() => {
    if (isOpen && hasCamera) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, hasCamera]);

  const startCamera = async () => {
    setError("");
    try {
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      setIsScanning(true);
      // In a real implementation, we would start analyzing video frames here
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasCamera(false);
      setError(
        "Unable to access camera. Please check permissions or try uploading an image.",
      );
      onScanError("Camera access error");
    }
  };

  const stopCamera = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match("image.*")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // In a real implementation, we would process the image to scan for QR codes
        // For now, we'll just simulate a successful scan
        mockScanQRCode();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const restartCamera = () => {
    stopCamera();
    setHasCamera(true);
    startCamera();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Scan QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
          {hasCamera ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500">Camera not available</p>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="animate-pulse text-white bg-black/50 px-4 py-2 rounded-full">
                Scanning...
              </div>
            </div>
          )}

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="text-center text-sm text-gray-500 mb-2">
          Position the QR code within the camera view or upload an image
          containing a QR code
        </div>
      </CardContent>

      <CardFooter className="flex justify-center space-x-2">
        {!hasCamera ? (
          <Button
            variant="outline"
            onClick={restartCamera}
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Camera Again
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => mockScanQRCode()}
            disabled={isScanning}
            className="flex items-center"
          >
            <Camera className="mr-2 h-4 w-4" />
            Scan Now
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={triggerFileUpload}
          disabled={isScanning}
          className="flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </CardFooter>
    </Card>
  );
};

export default QRCodeScanner;
