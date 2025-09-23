
import DogProfileCard from "~/components/dog-profile-card/dog-profile-card"
import "./adoption-list.css"

const dogsData = [
  {
    id: 1,
    name: "Lola",
    location: "Maranhão, Baías",
    gender: "Fêmea",
    breed: "Retriever",
    age: "14 meses",
    description:
      "Lola é um cão fêmea amigável, brincalhona e inteligente. Adotá...",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces",
  },
  {
    id: 2,
    name: "Max",
    location: "São Paulo, SP",
    gender: "Macho",
    breed: "Labrador",
    age: "2 anos",
    description:
      "Max é um cão muito energético e carinhoso, perfeito para famílias ativas...",
    image:
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop&crop=faces",
  },
  {
    id: 3,
    name: "Bella",
    location: "Rio de Janeiro, RJ",
    gender: "Fêmea",
    breed: "Poodle",
    age: "3 anos",
    description:
      "Bella é uma cadela muito dócil e carinhosa, ideal para apartamentos...",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=faces",
  },
  {
    id: 4,
    name: "Thor",
    location: "Minas Gerais, MG",
    gender: "Macho",
    breed: "Pastor Alemão",
    age: "5 anos",
    description:
      "Thor é um cão protetor e leal, excelente para guardar a casa...",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=faces",
  },
  {
    id: 5,
    name: "Luna",
    location: "Bahia, BA",
    gender: "Fêmea",
    breed: "Husky Siberiano",
    age: "1 ano",
    description:
      "Luna é uma cadela muito ativa e brincalhona, adora correr e brincar...",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop&crop=faces",
  },
  {
    id: 6,
    name: "Rocky",
    location: "Paraná, PR",
    gender: "Macho",
    breed: "Bulldog",
    age: "4 anos",
    description:
      "Rocky é um cão calmo e companheiro, perfeito para quem busca tranquilidade...",
    image:
      "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=300&fit=crop&crop=faces",
  },
]

export function AdoptionList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row  w-full">
        <div className="w-1/4">Filtros</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogsData.map((dog) => (
            <div key={dog.id} className="flex">
              <DogProfileCard dogData={dog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
