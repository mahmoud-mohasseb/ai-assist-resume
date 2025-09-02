import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import {
  ArrowLeft,
  Bell,
  Check,
  Archive,
  Trash2,
  Search,
  Filter,
  Settings,
  Briefcase,
  Users,
  Target,
  Award,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Clock,
  Eye,
  MoreHorizontal,
} from "lucide-react";

interface NotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type:
    | "job_alert"
    | "interview"
    | "skill_recommendation"
    | "system"
    | "achievement"
    | "message";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  actionText?: string;
  category: "career" | "learning" | "system" | "social";
}

export function Notifications({ onBack }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] =
    useState<string[]>([]);

  const [notifications, setNotifications] = useState<
    Notification[]
  >([
    {
      id: "1",
      type: "job_alert",
      title: "New Job Match Found!",
      message:
        "Senior React Developer at TechCorp matches your skills (95% match)",
      timestamp: "2 minutes ago",
      read: false,
      priority: "high",
      actionUrl: "#",
      actionText: "View Job",
      category: "career",
    },
    {
      id: "2",
      type: "interview",
      title: "Interview Reminder",
      message:
        "Your interview with InnovateLabs is scheduled for tomorrow at 2:00 PM",
      timestamp: "1 hour ago",
      read: false,
      priority: "high",
      actionUrl: "#",
      actionText: "Prepare",
      category: "career",
    },
    {
      id: "3",
      type: "skill_recommendation",
      title: "AI Skill Recommendation",
      message:
        "Based on market trends, learning TypeScript could increase your earning potential by 25%",
      timestamp: "3 hours ago",
      read: true,
      priority: "medium",
      actionUrl: "#",
      actionText: "Learn More",
      category: "learning",
    },
    {
      id: "4",
      type: "achievement",
      title: "Skill Level Up!",
      message:
        "Congratulations! Your React skill level has increased to 85%",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
      actionUrl: "#",
      actionText: "View Progress",
      category: "learning",
    },
    {
      id: "5",
      type: "message",
      title: "New Message from Recruiter",
      message:
        "Sarah Chen from TechCorp is interested in discussing a Senior Developer position",
      timestamp: "2 days ago",
      read: false,
      priority: "medium",
      actionUrl: "#",
      actionText: "Reply",
      category: "social",
    },
    {
      id: "6",
      type: "system",
      title: "Weekly Progress Report Ready",
      message:
        "Your weekly skills and career progress report is now available",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
      actionUrl: "#",
      actionText: "View Report",
      category: "system",
    },
    {
      id: "7",
      type: "job_alert",
      title: "Application Status Update",
      message:
        "Your application for Frontend Developer at StartupXYZ has been reviewed",
      timestamp: "4 days ago",
      read: true,
      priority: "medium",
      actionUrl: "#",
      actionText: "View Status",
      category: "career",
    },
    {
      id: "8",
      type: "skill_recommendation",
      title: "New Learning Path Available",
      message:
        "A personalized System Design learning path has been created for you",
      timestamp: "1 week ago",
      read: true,
      priority: "low",
      actionUrl: "#",
      actionText: "Start Learning",
      category: "learning",
    },
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    const iconMap = {
      job_alert: Briefcase,
      interview: Calendar,
      skill_recommendation: Target,
      system: Settings,
      achievement: Award,
      message: MessageSquare,
    };
    return iconMap[type];
  };

  const getNotificationColor = (type: Notification["type"]) => {
    const colorMap = {
      job_alert:
        "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      interview:
        "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
      skill_recommendation:
        "text-green-600 bg-green-100 dark:bg-green-900/30",
      system: "text-gray-600 bg-gray-100 dark:bg-gray-900/30",
      achievement:
        "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
      message: "text-pink-600 bg-pink-100 dark:bg-pink-900/30",
    };
    return colorMap[type];
  };

  const getPriorityColor = (
    priority: Notification["priority"],
  ) => {
    const colorMap = {
      high: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
      medium:
        "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10",
      low: "border-l-green-500 bg-green-50 dark:bg-green-900/10",
    };
    return colorMap[priority];
  };

  const filteredNotifications = notifications.filter(
    (notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "unread")
        return !notification.read && matchesSearch;
      if (activeTab === "career")
        return (
          notification.category === "career" && matchesSearch
        );
      if (activeTab === "learning")
        return (
          notification.category === "learning" && matchesSearch
        );

      return matchesSearch;
    },
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const toggleSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((notifId) => notifId !== id)
        : [...prev, id],
    );
  };

  const unreadCount = notifications.filter(
    (n) => !n.read,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Notifications
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with your career journey
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No notifications found
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "You're all caught up!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(
                    notification.type,
                  );
                  return (
                    <Card
                      key={notification.id}
                      className={`transition-all duration-200 hover:shadow-md cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read
                          ? "bg-blue-50/50 dark:bg-blue-900/10"
                          : ""
                      }`}
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`rounded-lg p-2 ${getNotificationColor(notification.type)}`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3
                                  className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {notification.title}
                                  {!notification.read && (
                                    <div className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2" />
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                              </div>

                              {/* Priority indicator */}
                              {notification.priority ===
                                "high" && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Urgent
                                </Badge>
                              )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </div>

                              <div className="flex items-center gap-2">
                                {notification.actionText && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7"
                                  >
                                    {notification.actionText}
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(
                                      notification.id,
                                    );
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Notification Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    notifications.filter(
                      (n) => n.category === "career",
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Career Updates
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    notifications.filter(
                      (n) => n.category === "learning",
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Learning Insights
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {
                    notifications.filter(
                      (n) => n.priority === "high",
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  High Priority
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    notifications.filter(
                      (n) => n.type === "job_alert",
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Job Alerts
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}