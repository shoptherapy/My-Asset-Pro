import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const MaintenancePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for maintenance tasks
  const maintenanceTasks = [
    {
      id: "MAINT-001",
      assetId: "ASSET-001",
      assetName: "Dell XPS 15 Laptop",
      taskName: "Software Update",
      dueDate: "2023-07-15",
      priority: "medium",
      status: "scheduled",
      assignedTo: "John Smith",
    },
    {
      id: "MAINT-002",
      assetId: "ASSET-003",
      assetName: "Conference Room Projector",
      taskName: "Lamp Replacement",
      dueDate: "2023-06-20",
      priority: "high",
      status: "in-progress",
      assignedTo: "Mike Johnson",
    },
    {
      id: "MAINT-003",
      assetId: "ASSET-002",
      assetName: "HP LaserJet Printer",
      taskName: "Toner Replacement",
      dueDate: "2023-06-10",
      priority: "critical",
      status: "overdue",
      assignedTo: "Sarah Williams",
    },
    {
      id: "MAINT-004",
      assetId: "ASSET-005",
      assetName: "iPhone 13 Pro",
      taskName: "Screen Protector Installation",
      dueDate: "2023-07-05",
      priority: "low",
      status: "scheduled",
      assignedTo: "John Smith",
    },
  ];

  // User information
  const userInfo = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    initials: "JD",
    notificationCount: 3,
  };

  const getPriorityBadgeClass = (priority: string) => {
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <Clock className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "hidden md:block" : "block"} transition-all duration-300 ease-in-out`}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName={userInfo.name}
          userAvatar={userInfo.avatar}
          userInitials={userInfo.initials}
          notificationCount={userInfo.notificationCount}
        />

        {/* Maintenance Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Maintenance</h1>
            <p className="text-gray-500">
              Schedule and track maintenance tasks for your assets
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search maintenance tasks..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
            <Button className="gap-1">
              <Plus size={18} />
              Schedule Maintenance
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Task ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Asset
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Task
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Due Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Assigned To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {task.id}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{task.assetName}</div>
                          <div className="text-xs text-gray-500">
                            {task.assetId}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{task.taskName}</td>
                      <td className="px-4 py-3 text-sm">{task.dueDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${getPriorityBadgeClass(task.priority)}`}
                        >
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(task.status)}`}
                          >
                            {task.status
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{task.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MaintenancePage;
