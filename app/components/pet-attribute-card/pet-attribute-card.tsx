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
    <div className="relative w-[80px] h-[69px] bg-[#F9F9F9] rounded-[8px] flex flex-col items-center justify-center pt-6">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center">
        {icon}
        <div className="absolute bottom-0 w-full h-1/2 border-b-4 border-[#D77445] rounded-b-full"></div>
      </div>

      <h2 className="text-[12px] font-semibold text-gray-700 mt-2">{title}</h2>
      <p className="text-[14px] font-bold text-orange-500">{value}</p>
    </div>
  )
}
