import type { SidebarGroupType } from "@/types/sidebar"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  MailQuestionMark,
  UserPlus,
  type LucideIcon,
  Backpack,
} from "lucide-react"

export const sidebarConfig: SidebarGroupType[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
      },
    ],
  },

  {
    label: "Management",
    items: [
      {
        title: "Queries",
        icon: MailQuestionMark,
        badge: "queries",
        url: "/query"
      },

      {
        title: "Packages",
        icon: Backpack,
        items: [
          {
            title: "Add Package",
            url: "/add-package",
          },
          {
            title: "All Package",
            url: "/all-package",

          },
        ],
      },

      {
        title: "Roles",
        url: "/roles",
        icon: Shield,
        roles: ["admin"],
      },

      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
]