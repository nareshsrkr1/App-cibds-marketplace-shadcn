import { useState } from "react"
import { LandingPage } from "@/components/LandingPage"
import { ConsolePage } from "@/components/ConsolePage"

function App() {
  const [page, setPage] = useState<"landing" | "workspace">("landing")

  if (page === "workspace") {
    return <ConsolePage onBack={() => setPage("landing")} />
  }

  return <LandingPage onOpenWorkspace={() => setPage("workspace")} />
}

export default App
