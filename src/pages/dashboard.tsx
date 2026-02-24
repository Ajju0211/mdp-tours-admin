
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart"
import { Header } from "@/components/dashboard/Header"
import { StatCard } from "@/components/dashboard/StatsCard"
import { revenueChart, stats } from "@/data/dashboardData"


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/40">
      <Header />

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, i) => (
            <StatCard key={i} {...item} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <AnalyticsChart data={revenueChart} />
        </div>
      </div>
    </div>
  )
}