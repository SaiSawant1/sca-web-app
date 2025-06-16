"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  ArrowLeft,
  Bell,
  CalendarIcon,
  Check,
  Globe,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getCurrentUser } from "../../../actions/getCurrentUser";

// Dummy user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Administrator",
  joinDate: new Date("2023-01-15"),
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  address: "123 Main St, Anytown, USA",
  phone: "+1 (555) 123-4567",
  language: "English",
  timezone: "UTC-5 (Eastern Time)",
  notifications: {
    email: true,
    push: true,
    marketing: false,
    security: true,
  },
  security: {
    twoFactor: false,
    lastPasswordChange: new Date("2023-03-10"),
  },
};

export default function SettingsPage() {
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
  });

  useEffect(() => {
    async function fetchUser() {
      const dbUser = await getCurrentUser();
      if (dbUser) {
        setUser((prev) => ({
          ...prev,
          ...dbUser,
          avatar: userData.avatar, // always use dummy avatar
          name: dbUser.name ?? "",
          address: dbUser.address ?? "",
        }));
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string) => {
    setUser((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications],
      },
    }));
  };

  const handleSecurityChange = (key: string) => {
    setUser((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key as keyof typeof prev.security],
      },
    }));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <Link href="/inventory">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex w-full border-b border-muted-foreground/20 bg-background">
            <TabsTrigger
              value="profile"
              className="flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <User className="h-4 w-4 inline-block mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <Settings className="h-4 w-4 inline-block mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <Bell className="h-4 w-4 inline-block mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <Shield className="h-4 w-4 inline-block mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex-1 py-3 px-4 text-center font-medium transition-colors border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              <Globe className="h-4 w-4 inline-block mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={isEditing ? formData.name : user.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={isEditing ? formData.email : user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={isEditing ? formData.address : user.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={isEditing ? formData.phone : user.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={user.role} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Date Joined</Label>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{format(user.joinDate, "MMMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {isEditing
                  ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </>
                  )
                  : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark mode
                    </p>
                  </div>
                  <ModeToggle />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["Default", "Blue", "Green", "Purple", "Orange"].map((
                      color,
                    ) => (
                      <div
                        key={color}
                        className={cn(
                          "h-10 rounded-md border cursor-pointer flex items-center justify-center",
                          color === "Default" &&
                          "bg-primary text-primary-foreground",
                        )}
                      >
                        {color === "Default" && <Check className="h-4 w-4" />}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Font Size</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      A-
                    </Button>
                    <Button variant="outline" size="sm">
                      A
                    </Button>
                    <Button variant="outline" size="sm">
                      A+
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in the browser
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.push}
                      onCheckedChange={() => handleNotificationChange("push")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and promotions
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.marketing}
                      onCheckedChange={() =>
                        handleNotificationChange("marketing")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about security events
                      </p>
                    </div>
                    <Switch
                      checked={user.notifications.security}
                      onCheckedChange={() =>
                        handleNotificationChange("security")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={user.security.twoFactor}
                      onCheckedChange={() => handleSecurityChange("twoFactor")}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Change Password</Label>
                    <div className="grid gap-4">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Input
                        type="password"
                        placeholder="Confirm New Password"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last changed:{" "}
                      {format(user.security.lastPasswordChange, "MMMM d, yyyy")}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Connected Devices</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>MacBook Pro - Chrome</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Sign Out
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>iPhone 13 - Safari</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue={user.language}>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue={user.timezone}>
                      <option value="UTC-5 (Eastern Time)">
                        UTC-5 (Eastern Time)
                      </option>
                      <option value="UTC-6 (Central Time)">
                        UTC-6 (Central Time)
                      </option>
                      <option value="UTC-7 (Mountain Time)">
                        UTC-7 (Mountain Time)
                      </option>
                      <option value="UTC-8 (Pacific Time)">
                        UTC-8 (Pacific Time)
                      </option>
                      <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                      <option value="UTC+1 (Central European Time)">
                        UTC+1 (Central European Time)
                      </option>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="MM/DD/YYYY">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="USD">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD (C$)</option>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
