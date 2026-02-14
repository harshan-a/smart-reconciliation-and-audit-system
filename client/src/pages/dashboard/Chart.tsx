import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"

type ChartProps = {
  chartData: { name: string; value: number; fill: string }[]
}

export default function Chart({ chartData }: ChartProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl h-96">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">
        Status Distribution
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            outerRadius={120}
            dataKey="value"
            nameKey="name"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
