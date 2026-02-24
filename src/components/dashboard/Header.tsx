import { Input } from "@/components/ui/input"

import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 border-b bg-background">
      <Input placeholder="Search..." className="max-w-sm" />

      <div className="flex items-center gap-6">
        <div className="relative">
          <Bell size={22} />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </div>

        <Avatar>
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}