import AdoptionSpecific from "~/pages/adoption-listing/[id]/page"
import type { Route } from "../+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function AdoptionSpecificPage() {
  return <AdoptionSpecific />
}
