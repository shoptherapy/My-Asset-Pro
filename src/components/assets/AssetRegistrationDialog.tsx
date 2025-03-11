import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";

interface AssetRegistrationDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  onGenerateQR?: (data: any) => void;
}

const AssetRegistrationDialog: React.FC<AssetRegistrationDialogProps> = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  onGenerateQR = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState<string>("basic");
  const [formData, setFormData] = useState<any>({
    basic: {
      assetName: "Default Asset",
      assetType: "computer",
      serialNumber: "SN12345",
    },
    location: {
      location: "Main Office",
      department: "IT",
      building: "HQ",
    },
    assignment: {
      assignedTo: "John Doe",
      assignedDate: new Date().toISOString().split("T")[0],
      assignedBy: "Admin User",
    },
    custom: {
      purchaseDate: new Date().toISOString().split("T")[0],
      warranty: "12 months",
      value: "1000",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStepSubmit = (step: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [step]: data,
    }));

    // Move to next step or submit if on last step
    if (step === "basic") setCurrentStep("location");
    else if (step === "location") setCurrentStep("assignment");
    else if (step === "assignment") setCurrentStep("custom");
    else if (step === "custom") handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Combine all form data from different steps
      const combinedData = {
        ...formData.basic,
        ...formData.location,
        ...formData.assignment,
        ...formData.custom,
      };

      // Submit the data
      await onSubmit(combinedData);

      // Generate QR code
      onGenerateQR(combinedData);

      // Close dialog or show success
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error submitting asset data:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Register New Asset
          </DialogTitle>
          <DialogDescription>
            Complete the form to register a new asset and generate a QR code for
            tracking.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs
            value={currentStep}
            onValueChange={setCurrentStep}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger
                value="basic"
                disabled={isSubmitting}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Basic Details
              </TabsTrigger>
              <TabsTrigger
                value="location"
                disabled={isSubmitting || !formData.basic.assetName}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Location
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                disabled={isSubmitting || !formData.location.location}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Assign User
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                disabled={isSubmitting}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Custom Attributes
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 border rounded-lg p-6">
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Asset Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={formData.basic.assetName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basic: {
                              ...formData.basic,
                              assetName: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Asset Type</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.basic.assetType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basic: {
                              ...formData.basic,
                              assetType: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="computer">Computer</option>
                        <option value="monitor">Monitor</option>
                        <option value="printer">Printer</option>
                        <option value="furniture">Furniture</option>
                        <option value="vehicle">Vehicle</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Serial Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={formData.basic.serialNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basic: {
                            ...formData.basic,
                            serialNumber: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={formData.location.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: {
                              ...formData.location,
                              location: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={formData.location.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: {
                              ...formData.location,
                              department: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Building</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={formData.location.building}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: {
                            ...formData.location,
                            building: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assigned To</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={formData.assignment.assignedTo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assignment: {
                              ...formData.assignment,
                              assignedTo: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Assigned Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={formData.assignment.assignedDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assignment: {
                              ...formData.assignment,
                              assignedDate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assigned By</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={formData.assignment.assignedBy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignment: {
                            ...formData.assignment,
                            assignedBy: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={formData.custom.purchaseDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            custom: {
                              ...formData.custom,
                              purchaseDate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Warranty</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={formData.custom.warranty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            custom: {
                              ...formData.custom,
                              warranty: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value ($)</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={formData.custom.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          custom: { ...formData.custom, value: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {Object.keys(formData).map(
                (step, index) =>
                  Object.keys(formData[step]).length > 0 && (
                    <div
                      key={step}
                      className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  ),
              )}
            </div>
            <span className="text-sm text-gray-500">
              {
                Object.values(formData).filter(
                  (step: any) => Object.keys(step).length > 0,
                ).length
              }{" "}
              of 4 steps completed
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleStepSubmit(currentStep, formData[currentStep])
              }
              disabled={
                isSubmitting ||
                (currentStep === "custom" && !formData.assignment.assignedTo)
              }
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : currentStep === "custom" ? (
                <>Complete Registration</>
              ) : (
                <>Continue</>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetRegistrationDialog;
