interface CardWithButtonProps {
  onClick?: () => void
}

export default function CardWithButton({ onClick }: CardWithButtonProps) {
  return (
    <div className="w-full border border-[#dfdfdf] rounded-[16px] p-6 flex flex-col items-center gap-4">
      <p className="text-center text-gray-800 font-bold text-base">
        Se você estiver interessado em adotar
      </p>

      <button
        onClick={onClick}
        className="bg-[#D77445] text-white text-sm font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Entre em Contato
      </button>
    </div>
  )
}
