import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { sidebarConfig } from "@/config/sidbar"
import { SidebarMenuCollapsible } from "./SideBarManu"

import { LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function AppSidebar() {
  const location = useLocation()

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/"
    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-background"
    >
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 p-0.5 pt-2" >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-semibold leading-none truncate">
                Admin Panel
              </span>
              <span className="text-xs text-muted-foreground truncate">
                Dashboard Management
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT */}
     <SidebarContent className="py-4">
  {sidebarConfig.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => {
            // 🔥 If item has sub-items → render collapsible
            if (item.items) {
              return (
                <SidebarMenuCollapsible
                  key={item.title}
                  item={{
                    title: item.title,
                    icon: item.icon,
                    items: (item.items || []).map(subItem => ({
                      ...subItem,
                      badge: subItem.badge !== undefined ? String(subItem.badge) : undefined,
                    })),
                    badge: item.badge !== undefined ? String(item.badge) : undefined,
                  }}
                  href={location.pathname}
                />
              )
            }

            // 🔥 Normal link
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.url!)}
                  tooltip={item.title}
                >
                  <Link
                    to={item.url!}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))}
</SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

