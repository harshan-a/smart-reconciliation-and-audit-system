import { useEffect, useState } from "react"
import api from "../../api/authAxios"
import StatCard from "./StatCard"
import Chart from "./Chart"
import Filters from "../../components/filters/Filters"

interface DashboardStats {
  total: number
  matched: number
  partial: number
  unmatched: number
  duplicate: number
  accuracy: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [filters, setFilters] = useState("")

  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    const res = await api.get("/dashboard?" + filters)
    setStats(res.data)
  }

  useEffect(() => {
    setLoading(true)
    try {
      fetchStats()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [filters])

  if (loading) return <div className="text-gray-400">Loading dashboard...</div>

  if (!stats) return <div className="text-gray-400">No data found</div>

  const chartData = [
    { name: "Matched", value: stats.matched, fill: "#22c55e" },
    { name: "Partial", value: stats.partial, fill: "#facc15" },
    { name: "Unmatched", value: stats.unmatched, fill: "#ef4444" },
    { name: "Duplicate", value: stats.duplicate, fill: "#a855f7" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-5">
        Dashboard Overview
      </h1>
      <Filters needDate={true} needUploadBy={true} setFilters={setFilters} />

      <div className="min-w-fit grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6 mb-10">
        <StatCard title="Total Records" value={stats.total} />
        <StatCard title="Matched" value={stats.matched} />
        <StatCard title="Partial" value={stats.partial} />
        <StatCard title="Unmatched" value={stats.unmatched} />
        <StatCard title="Duplicate" value={stats.duplicate} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            Reconciliation Accuracy
          </h2>
          <p className="text-4xl font-bold text-cyan-400">{stats.accuracy}%</p>
        </div>

        <Chart chartData={chartData} />
      </div>
    </div>
  )
}
