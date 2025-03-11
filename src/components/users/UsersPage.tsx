import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UsersPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for users
  const users = [
    {
      id: "USER-001",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Administrator",
      department: "IT",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      initials: "JS",
      lastActive: "2023-06-15",
    },
    {
      id: "USER-002",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Manager",
      department: "Operations",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      initials: "SW",
      lastActive: "2023-06-14",
    },
    {
      id: "USER-003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "User",
      department: "Marketing",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      initials: "MJ",
      lastActive: "2023-05-30",
    },
    {
      id: "USER-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "User",
      department: "Finance",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      initials: "ED",
      lastActive: "2023-06-12",
    },
    {
      id: "USER-005",
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Manager",
      department: "HR",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      initials: "DW",
      lastActive: "2023-06-10",
    },
  ];

  // User information
  const userInfo = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    initials: "JD",
    notificationCount: 3,
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Administrator":
        return "bg-purple-100 text-purple-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "User":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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

        {/* Users Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Users</h1>
            <p className="text-gray-500">
              Manage users and their access to the asset management system
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
            <Button className="gap-1">
              <Plus size={18} />
              Add User
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Last Active
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">
                              {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className={getRoleBadgeClass(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.department}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className={getStatusBadgeClass(user.status)}>
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.lastActive}</td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
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

export default UsersPage;
