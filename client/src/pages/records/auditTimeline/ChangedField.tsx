type ChangedFieldProps = {
  field: string
  oldValue: string
  newValue: string
}

export default function ChangedField({
  field,
  oldValue,
  newValue,
}: ChangedFieldProps) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-1">{field}</p>

      <div className="flex items-center gap-3">
        <span className="bg-red-900 text-red-400 px-2 py-1 rounded text-sm">
          {oldValue}
        </span>

        <span className="text-gray-500">→</span>

        <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-sm">
          {newValue}
        </span>
      </div>
    </div>
  )
}
