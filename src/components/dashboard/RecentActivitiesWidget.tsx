import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, ArrowUpDown, UserCheck, Edit, Trash } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "check-in" | "check-out" | "update" | "maintenance";
  assetName: string;
  assetId: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: string;
  description?: string;
}

interface RecentActivitiesWidgetProps {
  activities?: ActivityItem[];
  onViewAll?: () => void;
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "check-in":
      return <ArrowUpDown className="h-4 w-4 text-green-500" />;
    case "check-out":
      return <ArrowUpDown className="h-4 w-4 text-amber-500" />;
    case "update":
      return <Edit className="h-4 w-4 text-blue-500" />;
    case "maintenance":
      return <Trash className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getActivityBadge = (type: ActivityItem["type"]) => {
  switch (type) {
    case "check-in":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Check In
        </Badge>
      );
    case "check-out":
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          Check Out
        </Badge>
      );
    case "update":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Update
        </Badge>
      );
    case "maintenance":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Maintenance
        </Badge>
      );
    default:
      return <Badge>Activity</Badge>;
  }
};

const RecentActivitiesWidget: React.FC<RecentActivitiesWidgetProps> = ({
  activities = [
    {
      id: "1",
      type: "check-in",
      assetName: "Dell XPS Laptop",
      assetId: "LPT-001",
      user: {
        name: "John Doe",
        initials: "JD",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      timestamp: "10 minutes ago",
      description: "Checked in from maintenance",
    },
    {
      id: "2",
      type: "check-out",
      assetName: "Office Projector",
      assetId: "PRJ-003",
      user: {
        name: "Jane Smith",
        initials: "JS",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      timestamp: "2 hours ago",
      description: "Checked out for meeting room 3",
    },
    {
      id: "3",
      type: "update",
      assetName: "Conference Room Table",
      assetId: "FRN-042",
      user: {
        name: "Mike Johnson",
        initials: "MJ",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
      timestamp: "1 day ago",
      description: "Updated location information",
    },
    {
      id: "4",
      type: "maintenance",
      assetName: "Air Conditioner",
      assetId: "HVC-007",
      user: {
        name: "Sarah Williams",
        initials: "SW",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      timestamp: "2 days ago",
      description: "Scheduled maintenance for next week",
    },
  ],
  onViewAll = () => console.log("View all activities clicked"),
}) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold">
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest asset activities and updates
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 divide-y">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  {activity.user.avatar ? (
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                  ) : (
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.user.name}</p>
                    <div className="flex items-center gap-2">
                      {getActivityBadge(activity.type)}
                      <span className="text-xs text-gray-500">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{activity.assetName}</span> (
                    {activity.assetId})
                  </p>
                  {activity.description && (
                    <p className="text-xs text-gray-500">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesWidget;
