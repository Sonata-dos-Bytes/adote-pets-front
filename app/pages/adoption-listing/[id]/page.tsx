import { useParams } from "react-router"
import "./page.css"

export default function AdoptionSpecific() {
  const { id } = useParams()
  return (
    <main className="main-content">
      <h1>Adoção Específica {id}</h1>
    </main>
  )
}
