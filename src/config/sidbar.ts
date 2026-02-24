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

export type SidebarSubItem = {
  title: string
  url: string
  icon?: LucideIcon
  badge?: string | number
  roles?: string[]
}

export type SidebarItem = {
  title: string
  icon: LucideIcon
  url?: string              // normal link
  items?: SidebarSubItem[]  // collapsible
  badge?: string | number
  roles?: string[]
}

export type SidebarGroupType = {
  label: string
  items: SidebarItem[]
}
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
        badge: 3,
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