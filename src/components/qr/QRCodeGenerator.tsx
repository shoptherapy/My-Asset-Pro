import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Printer, Copy, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  assetName: z.string().min(2, { message: "Asset name is required" }),
  assetType: z.string().min(1, { message: "Asset type is required" }),
  serialNumber: z.string().optional(),
  location: z.string().optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface QRCodeGeneratorProps {
  onGenerate?: (data: FormValues) => void;
  isOpen?: boolean;
}

const QRCodeGenerator = ({
  onGenerate = () => {},
  isOpen = true,
}: QRCodeGeneratorProps) => {
  const [qrValue, setQrValue] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetName: "",
      assetType: "",
      serialNumber: "",
      location: "",
      assignedTo: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const qrData = JSON.stringify(data);
    setQrValue(qrData);
    setFormData(data);
    onGenerate(data);
  };

  const handleDownload = () => {
    if (!qrValue) return;

    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `asset-qr-${formData?.assetName || "code"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!qrValue) return;

    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .container { margin: 50px auto; max-width: 500px; }
            img { max-width: 100%; height: auto; }
            .details { margin-top: 20px; text-align: left; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Asset QR Code</h2>
            <img src="${dataUrl}" />
            <div class="details">
              <p><strong>Asset Name:</strong> ${formData?.assetName || ""}</p>
              <p><strong>Asset Type:</strong> ${formData?.assetType || ""}</p>
              ${formData?.serialNumber ? `<p><strong>Serial Number:</strong> ${formData.serialNumber}</p>` : ""}
              ${formData?.location ? `<p><strong>Location:</strong> ${formData.location}</p>` : ""}
              ${formData?.assignedTo ? `<p><strong>Assigned To:</strong> ${formData.assignedTo}</p>` : ""}
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "height=500,width=500");
    if (printWindow) {
      printWindow.document.write(windowContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleCopy = () => {
    if (!qrValue) return;

    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard
          .write([new ClipboardItem({ "image/png": blob })])
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      }
    });
  };

  const assetTypes = [
    { value: "computer", label: "Computer" },
    { value: "monitor", label: "Monitor" },
    { value: "printer", label: "Printer" },
    { value: "phone", label: "Phone" },
    { value: "tablet", label: "Tablet" },
    { value: "furniture", label: "Furniture" },
    { value: "vehicle", label: "Vehicle" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Generate Asset QR Code</h2>
          <p className="text-gray-500 mb-6">
            Fill in the asset details to generate a QR code that can be scanned
            for quick access to asset information.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="assetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter asset name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A unique name to identify this asset
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assetTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The category this asset belongs to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter serial number (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter location (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter user name (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Additional notes (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Generate QR Code
              </Button>
            </form>
          </Form>
        </div>

        <div>
          {qrValue ? (
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle>Asset QR Code</CardTitle>
                <CardDescription>
                  Scan this code to access asset details
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <QRCodeCanvas
                    id="qr-code"
                    value={qrValue}
                    size={200}
                    level="H"
                    includeMargin
                    imageSettings={{
                      src: "/vite.svg",
                      excavate: true,
                      height: 24,
                      width: 24,
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No QR code generated
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Fill out the form and click Generate QR Code to create a new
                  asset QR code.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
