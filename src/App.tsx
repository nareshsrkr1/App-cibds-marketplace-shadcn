import { useState } from "react"
import { LandingPage } from "@/components/LandingPage"
import { ConsolePage } from "@/components/ConsolePage"
import type { PersonaKey } from "@/data/personas"

function App() {
  const [page, setPage] = useState<"landing" | "workspace">("landing")
  const [persona, setPersona] = useState<PersonaKey>("producer")

  if (page === "workspace") {
    return (
      <ConsolePage
        key={persona}
        persona={persona}
        onBack={() => setPage("landing")}
        onSwitchRole={setPersona}
      />
    )
  }

  return <LandingPage onOpenWorkspace={() => setPage("workspace")} />
}

export default App
