import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Props {
  title: string
  value: string
  growth: number
}

export function StatCard({ title, value, growth }: Props) {
  const positive = growth >= 0

  return (
    <Card className="rounded-2xl border bg-background/60 backdrop-blur shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          <Badge variant={positive ? "default" : "destructive"}>
            {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {growth}%
          </Badge>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight">{value}</h2>
      </CardContent>
    </Card>
  )
}