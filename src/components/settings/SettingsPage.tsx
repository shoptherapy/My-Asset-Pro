import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

const SettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // User information
  const userInfo = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    initials: "JD",
    notificationCount: 3,
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

        {/* Settings Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-gray-500">
              Configure your asset management system preferences
            </p>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="p-0 bg-transparent h-auto">
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-3"
                  >
                    Integrations
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="general" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">
                        Organization Settings
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Configure your organization details
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="org-name">Organization Name</Label>
                          <Input
                            id="org-name"
                            defaultValue="Acme Corporation"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="org-email">Contact Email</Label>
                          <Input
                            id="org-email"
                            type="email"
                            defaultValue="contact@acmecorp.com"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium">
                        Asset Management Settings
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Configure asset tracking preferences
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-assign">
                              Auto-assign assets
                            </Label>
                            <p className="text-sm text-gray-500">
                              Automatically assign assets to users when checked
                              out
                            </p>
                          </div>
                          <Switch id="auto-assign" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenance-reminders">
                              Maintenance reminders
                            </Label>
                            <p className="text-sm text-gray-500">
                              Send reminders for scheduled maintenance tasks
                            </p>
                          </div>
                          <Switch id="maintenance-reminders" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="qr-code-logo">
                              Include logo in QR codes
                            </Label>
                            <p className="text-sm text-gray-500">
                              Add your organization logo to generated QR codes
                            </p>
                          </div>
                          <Switch id="qr-code-logo" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">
                        Notification Preferences
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Configure how and when you receive notifications
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">
                              Email Notifications
                            </Label>
                            <p className="text-sm text-gray-500">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-notifications">
                              Push Notifications
                            </Label>
                            <p className="text-sm text-gray-500">
                              Receive notifications in the app
                            </p>
                          </div>
                          <Switch id="push-notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenance-alerts">
                              Maintenance Alerts
                            </Label>
                            <p className="text-sm text-gray-500">
                              Get alerts for upcoming and overdue maintenance
                            </p>
                          </div>
                          <Switch id="maintenance-alerts" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="asset-checkout">
                              Asset Check-out/in
                            </Label>
                            <p className="text-sm text-gray-500">
                              Notifications when assets are checked out or in
                            </p>
                          </div>
                          <Switch id="asset-checkout" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Configure security and access control settings
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="two-factor">
                              Two-factor Authentication
                            </Label>
                            <p className="text-sm text-gray-500">
                              Require two-factor authentication for all users
                            </p>
                          </div>
                          <Switch id="two-factor" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="session-timeout">
                              Session Timeout
                            </Label>
                            <p className="text-sm text-gray-500">
                              Automatically log out inactive users
                            </p>
                          </div>
                          <Switch id="session-timeout" defaultChecked />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="timeout-duration">
                            Timeout Duration (minutes)
                          </Label>
                          <Input
                            id="timeout-duration"
                            type="number"
                            defaultValue="30"
                            className="max-w-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="integrations" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Integrations</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Connect with other services and applications
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Microsoft 365</h4>
                              <p className="text-sm text-gray-500">
                                Connect with Microsoft 365 for user management
                              </p>
                            </div>
                          </div>
                          <Button variant="outline">Connect</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Google Workspace</h4>
                              <p className="text-sm text-gray-500">
                                Connect with Google Workspace for user
                                management
                              </p>
                            </div>
                          </div>
                          <Button variant="outline">Connect</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium">Slack</h4>
                              <p className="text-sm text-gray-500">
                                Connect with Slack for notifications
                              </p>
                            </div>
                          </div>
                          <Button variant="outline">Connect</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
