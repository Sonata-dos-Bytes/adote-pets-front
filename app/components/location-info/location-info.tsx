import { MapPin } from "lucide-react"

interface LocationInfoProps {
  country?: string
  state: string
}

export default function LocationInfo({
  country = "Brasil",
  state,
}: LocationInfoProps) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <img
        src="https://flagcdn.com/w40/br.png"
        alt="Bandeira do Brasil"
        className="w-16 h-12 rounded shadow"
      />

      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-800">{country}</span>
        <span className="flex items-center text-gray-600 text-sm">
          <MapPin size={16} className="mr-1 text-gray-500" />
          {state}
        </span>
      </div>
    </div>
  )
}
