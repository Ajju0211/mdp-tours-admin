import type { LucideIcon } from "lucide-react"

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