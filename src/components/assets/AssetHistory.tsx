import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Calendar,
  User,
  Wrench,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface HistoryEvent {
  id: string;
  type: "status-change" | "maintenance" | "assignment" | "location-change";
  date: string;
  title: string;
  description: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

interface AssetHistoryProps {
  events?: HistoryEvent[];
  className?: string;
}

const getEventIcon = (type: HistoryEvent["type"]) => {
  switch (type) {
    case "status-change":
      return <ArrowRight className="h-4 w-4" />;
    case "maintenance":
      return <Wrench className="h-4 w-4" />;
    case "assignment":
      return <User className="h-4 w-4" />;
    case "location-change":
      return <ArrowLeft className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getEventBadgeVariant = (type: HistoryEvent["type"]) => {
  switch (type) {
    case "status-change":
      return "default";
    case "maintenance":
      return "destructive";
    case "assignment":
      return "secondary";
    case "location-change":
      return "outline";
    default:
      return "default";
  }
};

// Default events for when no props are provided
const defaultEvents: HistoryEvent[] = [
  {
    id: "1",
    type: "status-change",
    date: "May 15, 2023 - 10:30 AM",
    title: "Status Changed to In Use",
    description: "Asset status was updated from Available to In Use",
    user: {
      name: "John Doe",
      initials: "JD",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  },
  {
    id: "2",
    type: "maintenance",
    date: "April 28, 2023 - 2:15 PM",
    title: "Scheduled Maintenance",
    description:
      "Regular maintenance performed - replaced battery and updated firmware",
    user: {
      name: "Sarah Tech",
      initials: "ST",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  },
  {
    id: "3",
    type: "assignment",
    date: "March 12, 2023 - 9:00 AM",
    title: "Assigned to Marketing Department",
    description: "Asset was assigned to the Marketing team for the Q2 campaign",
    user: {
      name: "Mike Manager",
      initials: "MM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
  },
  {
    id: "4",
    type: "location-change",
    date: "February 5, 2023 - 11:45 AM",
    title: "Location Changed",
    description: "Asset was moved from Main Office to Branch Office #2",
    user: {
      name: "Lisa Logistics",
      initials: "LL",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
  },
];

// Check for maintenance data in localStorage
const getMaintenanceEvents = (): HistoryEvent[] => {
  try {
    const storedEvents = localStorage.getItem("assetMaintenanceEvents");
    if (storedEvents) {
      return JSON.parse(storedEvents);
    }
  } catch (error) {
    console.error("Error retrieving maintenance events:", error);
  }
  return [];
};

const AssetHistory = ({ events = [], className = "" }: AssetHistoryProps) => {
  const [allEvents, setAllEvents] = useState<HistoryEvent[]>([]);

  // Force refresh of maintenance events on each render and when storage changes
  useEffect(() => {
    const maintenanceEvents = getMaintenanceEvents();
    setAllEvents([...maintenanceEvents, ...defaultEvents]);

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const updatedEvents = getMaintenanceEvents();
      setAllEvents([...updatedEvents, ...defaultEvents]);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also set up a polling mechanism to check for changes
    const intervalId = setInterval(() => {
      const updatedEvents = getMaintenanceEvents();
      setAllEvents([...updatedEvents, ...defaultEvents]);
    }, 2000); // Check every 2 seconds

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const displayEvents = events.length > 0 ? events : allEvents;

  return (
    <Card className={`w-full bg-white ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Asset History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {displayEvents.map((event, index) => (
            <div key={event.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{event.title}</p>
                    <Badge
                      variant={getEventBadgeVariant(event.type)}
                      className="text-xs"
                    >
                      {event.type.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                    {event.user && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            {event.user.avatar ? (
                              <AvatarImage
                                src={event.user.avatar}
                                alt={event.user.name}
                              />
                            ) : (
                              <AvatarFallback className="text-[8px]">
                                {event.user.initials}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span>{event.user.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {index < displayEvents.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-border ml-[0.6rem] h-[calc(100%-0.5rem)]"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetHistory;
