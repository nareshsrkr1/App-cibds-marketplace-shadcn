import {
  UploadCloud,
  Search,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type PersonaKey = "producer" | "consumer" | "governance" | "admin"

export type NavSection = {
  key: string
  icon: LucideIcon
  label: string
  items: string[]
}

export type Persona = {
  key: PersonaKey
  label: string
  description: string
  icon: LucideIcon
  color: string
  assigned: boolean
  navTop: string[]
  navSections: NavSection[]
}

const stage = {
  produce: "var(--stage-produce)",
  publish: "var(--stage-publish)",
  govern: "var(--stage-govern)",
  share: "var(--stage-share)",
  consume: "var(--stage-consume)",
}

export const personas: Persona[] = [
  {
    key: "producer",
    label: "Producer",
    description: "Publish and own the datasets your team creates.",
    icon: UploadCloud,
    color: stage.produce,
    assigned: true,
    navTop: ["Console"],
    navSections: [
      { key: "my-datasets", icon: UploadCloud, label: "My datasets", items: ["Published datasets", "Drafts", "Bind columns"] },
      { key: "curation", icon: Search, label: "Curation", items: ["Classification", "Lineage"] },
      { key: "workflow", icon: ShieldCheck, label: "Workflow", items: ["My submissions", "Approvals needed"] },
    ],
  },
  {
    key: "consumer",
    label: "Consumer",
    description: "Discover datasets across the firm and request access.",
    icon: Search,
    color: stage.consume,
    assigned: true,
    navTop: ["Console"],
    navSections: [
      { key: "catalog", icon: Search, label: "Catalog", items: ["Physical datasets", "Logical datasets", "Business glossary", "Data elements"] },
      { key: "my-access", icon: UploadCloud, label: "My access", items: ["My requests", "Bound datasets"] },
    ],
  },
  {
    key: "governance",
    label: "Data Governance",
    description: "Review classifications, approve requests, and audit usage.",
    icon: ShieldCheck,
    color: stage.govern,
    assigned: true,
    navTop: ["Console"],
    navSections: [
      { key: "catalog", icon: Search, label: "Catalog", items: ["Physical datasets", "Logical datasets", "Business glossary"] },
      { key: "governance", icon: ShieldCheck, label: "Governance", items: ["Policies", "Access requests", "Audit log", "Classification review"] },
    ],
  },
  {
    key: "admin",
    label: "Admin",
    description: "Manage users, policies, and platform configuration.",
    icon: Settings,
    color: stage.share,
    assigned: false,
    navTop: ["Console"],
    navSections: [
      { key: "admin", icon: Settings, label: "Administration", items: ["User management", "Roles & personas", "Integrations", "System settings"] },
      { key: "governance", icon: ShieldCheck, label: "Governance", items: ["Policies", "Audit log"] },
    ],
  },
]
