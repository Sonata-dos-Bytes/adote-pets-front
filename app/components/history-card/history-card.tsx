interface HistoryCardProps {
  title: string
  story: string
}

export default function HistoryCard({ title, story }: HistoryCardProps) {
  return (
    <div className="w-full border border-[#EDEDED] rounded-[16px] bg-[#F9F9F9] p-6 flex flex-col gap-4">
      <h2 className="text-[#A7A5A6] text-lg font-bold">{title}</h2>

      <p className="text-black font-bold text-base text-justify">
        {story}
      </p>
    </div>
  )
}
