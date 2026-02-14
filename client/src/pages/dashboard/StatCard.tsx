export default function StatCard({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-cyan-500 transition">
      <p className="text-gray-400 mb-2">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
