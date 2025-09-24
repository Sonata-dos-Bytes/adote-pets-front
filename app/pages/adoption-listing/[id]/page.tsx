import { useParams } from "react-router"
import "./page.css"
import PetInfo from "~/components/pet-info/pet-info"
import LocationInfo from "~/components/location-info/location-info"
import type { IDog } from "~/types/IDog"

const dogsData: IDog[] = [
  {
    id: 1,
    name: "Lola",
    location: "Maranhão",
    gender: "Fêmea",
    breed: "Retriever",
    age: "14 meses",
    description:
      "Lola é um cão fêmea amigável, brincalhona e inteligente. Adotá...",
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
    </main>
  )
}
