type InputProps = {
  label: string
  value: string | number
  onChange: (value: string) => void
  type?: "text" | "number"
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-gray-900 border border-gray-700 rounded p-2 text-white"
      />
    </div>
  )
}
