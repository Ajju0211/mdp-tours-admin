// components/dashboard/Dashboard.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUp,
  ArrowDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Bell,
  Settings,
  User,
  LogOut,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("week");

  // Dummy data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Sales",
      value: "1,234",
      change: "+12.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-500",
    },
    {
      title: "Products",
      value: "123",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-orange-500",
    },
  ];

  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$235.00",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$421.00",
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "#12347",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "$632.00",
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "#12348",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: "$123.00",
      status: "completed",
      date: "2024-01-14",
    },
    {
      id: "#12349",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      amount: "$754.00",
      status: "cancelled",
      date: "2024-01-13",
    },
  ];

  const topProducts = [
    { name: "Product A", sales: 1234, revenue: "$12,345", growth: "+15%" },
    { name: "Product B", sales: 987, revenue: "$9,876", growth: "+8%" },
    { name: "Product C", sales: 756, revenue: "$7,560", growth: "+12%" },
    { name: "Product D", sales: 543, revenue: "$5,430", growth: "-3%" },
    { name: "Product E", sales: 321, revenue: "$3,210", growth: "+5%" },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "purchased",
      target: "Product A",
      time: "2 minutes ago",
      avatar: "JD",
    },
    {
      user: "Jane Smith",
      action: "created",
      target: "new order",
      time: "15 minutes ago",
      avatar: "JS",
    },
    {
      user: "Bob Johnson",
      action: "updated",
      target: "inventory",
      time: "1 hour ago",
      avatar: "BJ",
    },
    {
      user: "Alice Brown",
      action: "added",
      target: "Product X",
      time: "3 hours ago",
      avatar: "AB",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: "bg-green-500",
      processing: "bg-blue-500",
      pending: "bg-yellow-500",
      cancelled: "bg-red-500",
    };
    return variants[status] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold">DashFlow</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            {/* Time Range Selector */}
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">
                    from last {timeRange}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Charts and Tables Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Revenue Chart Card */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Your revenue performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed">
                  <p className="text-muted-foreground">
                    Chart component would go here
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activities Card */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest actions from your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{activity.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.user}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.action} {activity.target}
                          </p>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have {recentOrders.length} orders this{" "}
                  {timeRange === "today" ? "today" : timeRange}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.email}</td>
                          <td className="px-6 py-4">{order.amount}</td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusBadge(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>
                  Best performing products this {timeRange}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.revenue}
                          </p>
                        </div>
                        <Progress value={(product.sales / 1500) * 100} />
                        <div className="flex items-center justify-between text-xs">
                          <span>{product.sales} units sold</span>
                          <span
                            className={
                              product.growth.startsWith("+")
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {product.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics would be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed">
                <p className="text-muted-foreground">
                  Analytics components would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and view reports
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed">
                <p className="text-muted-foreground">
                  Reports components would go here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}