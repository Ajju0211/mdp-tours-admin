import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useAuthStore } from "@/store/adminAuth.store";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { getProfile } from "@/api/auth/auth";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout() {
  const { auth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/add-package") {
      console.log("Component 'reloaded' logic runs here");
      // call your reset functions or API calls here
    }
  }, [location.pathname]);
  // Fetch user info on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getProfile(); // calls /auth/me
        if (res.user) {
          auth.setUser(res.user);
          auth.setIsAuthenticated(true);
        } else {
          auth.setIsAuthenticated(false);
        }
      } catch (err) {
        auth.setIsAuthenticated(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center gap-2">
        <span className="text-[14px] sm:text-[16px]">Loading..</span>
        <Loader2Icon className="size-6 sm:size-8 animate-spin" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Authenticated → show admin layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center  border-b p-4">
          <SidebarTrigger />
          <div className="w-full h-full items-center justify-between gap-4 flex">
            {/* <h1 className="ml-4 font-semibold">Admin Panel </h1> */}
            <h1 className="ml-4 font-semibold"> </h1>

            <ModeToggle />
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
