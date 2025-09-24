import { useParams } from "react-router"
import "./page.css"
import PetInfo from "~/components/pet-info/pet-info"
import LocationInfo from "~/components/location-info/location-info"
import HistoryCard from "~/components/history-card/history-card"
import CardWithButton from "~/components/card-with-button/card-with-button"
import type { IDog } from "~/types/IDog"
import PetAttributeCard from "~/components/pet-attribute-card/pet-attribute-card"
import { User } from "lucide-react"

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
    <main className="main-content">
      <h1 className="text-2xl font-bold">Adoção Específica {dog.id}</h1>

      <PetInfo pet={dog} />
      <LocationInfo state={dog.location} />
      <HistoryCard title="História de Magie" story={dog.description} />
      <CardWithButton />
      <PetAttributeCard
        title="Gênero"
        value={dog.gender}
        icon={<User size={48} />}
      />
    </main>
  )
}
