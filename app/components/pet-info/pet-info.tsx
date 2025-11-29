import type { IPet } from "@/types/IPet";


export default function PetInfo({ pet }: { pet: IPet }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <img
        src={pet.files[0]?.path}
        alt={pet.name}
        className="w-20 h-20 p-1 rounded-full border-2 border-dotted border-gray-800 object-cover"
      />

      <div className="flex flex-col">
        <span className="text-2xl font-bold text-[#A7A5A6]">{pet.name}</span>
        <span className="font-bold text-lg text-gray-800">
          Pet ID:
          <span className="text-[#A7A5A6] font-bold pl-2">{pet.externalId}</span>
        </span>
      </div>
    </div>
  )
}
