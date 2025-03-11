import React from "react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Wrench,
  QrCode,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  userName?: string;
  userAvatar?: string;
  userInitials?: string;
  notificationCount?: number;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  userInitials = "JD",
  notificationCount = 3,
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <Package size={20} />,
      label: "Assets",
      path: "/assets",
    },
    {
      icon: <Wrench size={20} />,
      label: "Maintenance",
      path: "/maintenance",
    },
    {
      icon: <QrCode size={20} />,
      label: "QR Codes",
      path: "/qr-codes",
    },
    {
      icon: <Users size={20} />,
      label: "Users",
      path: "/users",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  const handleProfileClick = () => {
    // Navigate to profile page or open profile dialog
    console.log("Profile clicked");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked");
    // Implement logout functionality
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
    // Open notifications panel or navigate to notifications page
  };

  return (
    <div
      className={cn(
        "h-full bg-white border-r flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <QrCode size={18} className="text-white" />
          </div>
          {!collapsed && <span className="font-bold text-lg">AssetTrack</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          <ChevronRight
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow py-6 px-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive ||
                            (item.path === "/" && location.pathname === "/")
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100",
                          collapsed && "justify-center",
                        )
                      }
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help section */}
      <div className="px-3 py-2">
        <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 text-gray-600 hover:bg-gray-100 justify-start",
                  collapsed && "justify-center",
                )}
              >
                <HelpCircle size={20} />
                {!collapsed && <span>Help & Support</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Help & Support</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* User profile and notifications */}
      <div className="mt-auto border-t p-3">
        <div className="flex items-center justify-between mb-2">
          {!collapsed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-gray-500">Administrator</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={handleNotificationsClick}
                  >
                    <Bell size={collapsed ? 20 : 18} />
                    {notificationCount > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white"
                        variant="destructive"
                      >
                        <span className="text-[10px]">{notificationCount}</span>
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={collapsed ? "right" : "top"}>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {collapsed && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettingsClick}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogoutClick}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!collapsed && (
              <TooltipProvider delayDuration={1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogoutClick}
                    >
                      <LogOut size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
