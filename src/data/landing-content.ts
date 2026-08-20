export type Metric = { key: string; value: number; label: string }

export type DiagramNode = {
  kind: "app" | "offer" | "dataset" | "contract" | "sub"
  k: string
  id: string
  d: string
  connLabel?: string
}

export type Capability = {
  n: string
  title: string
  body: string
  tags: string[]
  ai?: boolean
  aiTag?: string
}

export type PipelineStep = { n: string; title: string; body: string }

export type FaqItem = { q: string; a: string }

export const desks: string[] = [
  "Commodities Desk",
  "Market Risk",
  "Credit Risk",
  "Investments Ops",
  "Compliance",
  "Corporate Treasury",
]

export const metrics: Metric[] = [
  { key: "physical-datasets", value: 6, label: "Physical datasets" },
  { key: "subject-areas", value: 14, label: "Subject areas" },
  { key: "logical-datasets", value: 27, label: "Logical datasets" },
  { key: "data-elements", value: 74, label: "Data elements" },
  { key: "business-terms", value: 68, label: "Glossary terms" },
]

export const diagram: DiagramNode[] = [
  { kind: "app", k: "A team has data", id: "Producer", d: "e.g. a trading desk", connLabel: "lists it" },
  { kind: "offer", k: "They publish it to the marketplace", id: "Published dataset", d: "described, classified, owned", connLabel: "someone finds it" },
  { kind: "dataset", k: "Another team wants it", id: "Consumer", d: "e.g. risk or reporting", connLabel: "requests access" },
  { kind: "contract", k: "The owner approves", id: "Agreement", d: "terms agreed & recorded", connLabel: "data flows" },
  { kind: "sub", k: "Data is delivered", id: "Live feed", d: "governed, traceable" },
]

export const capabilities: Capability[] = [
  {
    n: "01",
    title: "List your data",
    body: "Owner, sensitivity, and description — one source everyone can rely on.",
    tags: ["Ownership", "Sensitivity", "Description"],
  },
  {
    n: "02",
    title: "Explain what it means",
    body: "Every field maps to a shared business definition. No tribal knowledge.",
    tags: ["Shared definitions", "Lineage", "Approved"],
  },
  {
    n: "03",
    title: "Keep it trusted",
    body: "Checked, classified, and approved before anything moves.",
    tags: ["Contracts", "Audit", "Access control"],
  },
  {
    n: "04",
    title: "Give it meaning",
    body: "Plain-English context, not just raw columns and numbers.",
    tags: ["Plain-English", "Definitions", "Domain"],
  },
  {
    n: "05",
    title: "Trace it end to end",
    body: "See exactly where data came from — and where it goes.",
    tags: ["Source to consumer", "Traceability", "Provenance"],
  },
  {
    n: "06",
    title: "A shared ontology",
    body: "Ask in plain English what data exists and where it flows.",
    tags: ["Ontology", "Connected context", "Ask in plain English"],
    ai: true,
    aiTag: "Context Fabric",
  },
]

export const pipeline: PipelineStep[] = [
  { n: "1", title: "Produce", body: "Created as part of daily work" },
  { n: "2", title: "Publish", body: "Listed and described in the marketplace" },
  { n: "3", title: "Govern", body: "Checked, classified, approved" },
  { n: "4", title: "Share", body: "Requested, approved, agreed" },
  { n: "5", title: "Consume", body: "Delivered as a trusted feed" },
]

export const faqs: FaqItem[] = [
  {
    q: "Glossary term vs. data element vs. column — what's the difference?",
    a: "A glossary term is business language. A business data element is its governed definition. A column is the actual field in a source file. Binding connects the two; the element realises the term.",
  },
  {
    q: "Who can publish without a governance review?",
    a: "A producer can publish directly once every column binds to an already-endorsed element. New or unmapped elements route to Data Governance first.",
  },
  {
    q: "How is a dataset classified?",
    a: "Classification is inherited from the business data elements it binds to — sensitivity and PII status travel with the element, not a manual label.",
  },
  {
    q: "What's the approval SLA?",
    a: "2 business days standard; up to 5 for PII or Confidential datasets. Expedited review available for production-critical submissions.",
  },
]
