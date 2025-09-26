import React from "react"
import type { ReactNode } from "react"

interface PetAttributeCardProps {
  title: string
  value: string | number
  icon: ReactNode
}

export default function PetAttributeCard({
  title,
  value,
  icon,
}: PetAttributeCardProps) {
  return (
    <div className="relative w-[81px] h-[70px] bg-[#F9F9F9] rounded-[8px] flex flex-col items-center justify-end pb-2">
      <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-[#D77445] bg-white flex items-center justify-center">
        {icon}
      </div>

      <h2 className="text-[12px] font-semibold text-gray-700">{title}</h2>
      <p className="text-[14px] font-bold text-orange-500">{value}</p>
    </div>
  )
}
