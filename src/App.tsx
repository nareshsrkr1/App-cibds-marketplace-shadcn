import { useState } from "react"
import { LandingPage } from "@/components/LandingPage"
import { ConsolePage } from "@/components/ConsolePage"
import { RoleSelectPage } from "@/components/RoleSelectPage"
import type { PersonaKey } from "@/data/personas"

type Page = "landing" | "workspace" | "role-select"

function App() {
  const [page, setPage] = useState<Page>("landing")
  const [persona, setPersona] = useState<PersonaKey>("producer")

  if (page === "role-select") {
    return (
      <RoleSelectPage
        onBack={() => setPage("workspace")}
        onSelect={(next) => {
          setPersona(next)
          setPage("workspace")
        }}
      />
    )
  }

  if (page === "workspace") {
    return (
      <ConsolePage
        key={persona}
        persona={persona}
        onBack={() => setPage("landing")}
        onSwitchRole={() => setPage("role-select")}
      />
    )
  }

  return <LandingPage onOpenWorkspace={() => setPage("workspace")} />
}

export default App
