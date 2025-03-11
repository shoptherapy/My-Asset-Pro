import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Clock,
  Wrench,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface MaintenanceTask {
  id: string;
  assetName: string;
  taskName: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "upcoming" | "overdue";
}

interface MaintenanceAlertsWidgetProps {
  tasks?: MaintenanceTask[];
  onViewAll?: () => void;
  onTaskClick?: (taskId: string) => void;
}

const MaintenanceAlertsWidget = ({
  tasks = [
    {
      id: "1",
      assetName: "Printer HP LaserJet 4200",
      taskName: "Toner Replacement",
      dueDate: "2023-06-15",
      priority: "high",
      status: "overdue",
    },
    {
      id: "2",
      assetName: "Conference Room Projector",
      taskName: "Lamp Inspection",
      dueDate: "2023-06-20",
      priority: "medium",
      status: "upcoming",
    },
    {
      id: "3",
      assetName: "Server Rack A",
      taskName: "Cooling System Maintenance",
      dueDate: "2023-06-18",
      priority: "critical",
      status: "upcoming",
    },
  ],
  onViewAll = () => {},
  onTaskClick = () => {},
}: MaintenanceAlertsWidgetProps) => {
  const getPriorityColor = (priority: MaintenanceTask["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: MaintenanceTask["status"]) => {
    return status === "overdue" ? (
      <AlertTriangle className="h-4 w-4 text-red-500" />
    ) : (
      <Calendar className="h-4 w-4 text-blue-500" />
    );
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-500" />
            Maintenance Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <Wrench className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No maintenance tasks scheduled</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onTaskClick(task.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{task.assetName}</h4>
                    <p className="text-sm text-gray-600">{task.taskName}</p>
                  </div>
                  <Badge className={`${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    <span
                      className={
                        task.status === "overdue"
                          ? "text-red-600"
                          : "text-blue-600"
                      }
                    >
                      {task.status === "overdue" ? "Overdue" : "Upcoming"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-sm flex items-center justify-center gap-1"
          onClick={onViewAll}
        >
          Schedule Maintenance
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceAlertsWidget;
