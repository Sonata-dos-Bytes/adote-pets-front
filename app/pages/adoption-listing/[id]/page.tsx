import { useParams } from "react-router"
import "./page.css"
import PetInfo from "~/components/pet-info/pet-info"
import LocationInfo from "~/components/location-info/location-info"
import HistoryCard from "~/components/history-card/history-card"
import CardWithButton from "~/components/card-with-button/card-with-button"
import type { IDog } from "~/types/IDog"
import PetAttributeCard from "~/components/pet-attribute-card/pet-attribute-card"
import { Venus, Clock, PawPrint } from "lucide-react"
import Gallery from "~/components/gallery/gallery"

const petImages = [
  { src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces', alt: 'Descrição da imagem 1' },
  { src: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=faces', alt: 'Descrição da imagem 2' },
  { src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=faces', alt: 'Descrição da imagem 3' },
  { src: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=faces', alt: 'Descrição da imagem 4' },
];

const dogsData: IDog[] = [
  {
    id: 1,
    name: "Lola",
    location: "Maranhão",
    gender: "Fêmea",
    breed: "Retriever",
    age: "14 meses",
    description:
      "Temos a Magie desde que ela conseguiu deixar a mãe ainda filhote, com 8 semanas de idade. Atualmente, Magie mora com dois filhos de 7 e 13 anos e recebe muitos visitantes em casa, incluindo crianças. Ela é ótima com crianças. Há muitos gatos, pássaros, etc., por perto e no jardim na maioria dos dias, pois eles não a incomodam.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces",
  },
]

export default function AdoptionSpecific() {
  const { id } = useParams<{ id: string }>()
  const dog = dogsData.find((d) => d.id === Number(id))

  if (!dog) {
    return (
      <main className="main-content">
        <h1>Pet não encontrado</h1>
      </main>
    )
  }

  return (
    <main className="max-w-full md:max-w-[1350px] mx-auto main-content p-4 md:p-0">
      <h1 className="text-2xl font-bold">Olá, humano!</h1>

      <PetInfo pet={dog} />
      <LocationInfo state={dog.location} />

      <div className="flex flex-col md:flex-row mt-6">
        <div className="w-full md:w-2/3">
          <Gallery images={petImages} />
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center gap-6 p-0 md:p-4">
          <HistoryCard title="História de Magie" story={dog.description} />
          <CardWithButton />

          <div className="flex w-full justify-between items-center mt-6 mb-10">
            <PetAttributeCard
              title="Gênero"
              value={dog.gender}
              icon={<Venus size={22} color="#D77445" />}
            />
            <PetAttributeCard
              title="Raça"
              value={dog.breed}
              icon={<PawPrint size={22} color="#D77445" />}
            />
            <PetAttributeCard
              title="Idade"
              value={dog.age}
              icon={<Clock size={22} color="#D77445" />}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
