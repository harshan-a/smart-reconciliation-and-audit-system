interface Props {
  message: string
  onClose: () => void
}

export default function ErrorPopup({ message, onClose }: Props) {
  return (
    <div className="fixed top-5 right-5 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50">
      <div className="flex justify-between items-center gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold">
          ✕
        </button>
      </div>
    </div>
  )
}
