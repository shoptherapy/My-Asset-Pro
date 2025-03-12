import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssetMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
  assetName: string;
  onSchedule?: (data: MaintenanceFormData) => void;
}

interface MaintenanceFormData {
  assetId: string;
  taskName: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  priority: "low" | "medium" | "high" | "critical";
  notes: string;
}

const AssetMaintenanceDialog: React.FC<AssetMaintenanceDialogProps> = ({
  isOpen,
  onClose,
  assetId,
  assetName,
  onSchedule = () => {},
}) => {
  const [formData, setFormData] = useState<MaintenanceFormData>({
    assetId,
    taskName: "",
    description: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Default to 1 week from now
    assignedTo: "",
    priority: "medium",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scheduling maintenance with data:", formData);

    // Add to history log
    try {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} - ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;

      const newEvent = {
        id: `maint-${Date.now()}`,
        type: "maintenance" as const,
        date: formattedDate,
        title: `Scheduled Maintenance: ${formData.taskName}`,
        description:
          formData.description ||
          `Maintenance scheduled with ${formData.priority} priority`,
        user: {
          name: formData.assignedTo || "System User",
          initials: (formData.assignedTo || "SU")
            .split(" ")
            .map((n) => n[0])
            .join(""),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.assignedTo || "system"}`,
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
        console.error("Error retrieving maintenance events:", error);
      }

      // Add new event to the beginning of the array
      existingEvents.unshift(newEvent);

      // Store back in localStorage
      localStorage.setItem(
        "assetMaintenanceEvents",
        JSON.stringify(existingEvents),
      );

      // Trigger storage event manually since it doesn't fire on same page
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error saving maintenance event:", error);
    }

    onSchedule(formData);

    // Create success notification
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "#10b981"; // Green color
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    notification.style.zIndex = "9999";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "8px";
    notification.style.fontWeight = "bold";

    // Add checkmark icon
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>Maintenance task "${formData.taskName}" scheduled successfully</span>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transition = "opacity 0.5s ease";

      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assetName">Asset</Label>
            <Input
              id="assetName"
              value={assetName}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              name="taskName"
              placeholder="e.g., Software Update, Hardware Inspection"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the maintenance task"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input
              id="assignedTo"
              name="assignedTo"
              placeholder="Enter name or select user"
              value={formData.assignedTo}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional information"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Schedule Maintenance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssetMaintenanceDialog;
