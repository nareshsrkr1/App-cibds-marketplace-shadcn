import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  Menu,
  Database,
  BookOpenCheck,
  ShieldCheck,
  MessageSquareText,
  GitBranch,
  Network,
  Mail,
  Search,
  LayoutGrid,
  GitCommitHorizontal,
  Workflow,
  Sprout,
  UploadCloud,
  Share2,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { capabilities, faqs, metrics, pipeline } from "@/data/landing-content"

const stageColors = [
  "var(--stage-produce)",
  "var(--stage-publish)",
  "var(--stage-govern)",
  "var(--stage-share)",
  "var(--stage-consume)",
] as const

const capIcons = [Database, BookOpenCheck, ShieldCheck, MessageSquareText, GitBranch, Network]
const pipelineIcons = [Sprout, UploadCloud, ShieldCheck, Share2, Download]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function Kicker({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      <span
        className="h-[3px] w-5 rounded-full"
        style={{ backgroundColor: color ?? "var(--stage-publish)" }}
      />
      {children}
    </p>
  )
}

function NavLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(id)
      }}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  )
}

const mockRows = [
  { name: "Endur OTC Commodity Trades", sor: "Endur", cls: "Internal", bound: 78 },
  { name: "1CAT Investments Trades", sor: "Catalyst", cls: "Internal", bound: 78 },
  { name: "Endur Composer Child Trades", sor: "Endur", cls: "Confidential", bound: 62 },
  { name: "Endur P&L and Greeks", sor: "Endur", cls: "Internal", bound: 91 },
]

const mockNav = [
  { icon: LayoutGrid, label: "Console" },
  { icon: Database, label: "Physical datasets" },
  { icon: GitCommitHorizontal, label: "Bind columns" },
  { icon: Workflow, label: "Workflow" },
]

/** A real product preview, not an abstract diagram — this is what the workspace this
 * page sells actually looks like: dark sidebar rail, a dataset table, status badges. */
function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-black/[0.06]">
      <div className="flex h-9 items-center gap-1.5 border-b border-border bg-muted/50 px-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 rounded bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          workspace.datamarketplace.internal
        </span>
      </div>
      <div className="flex">
        <div className="hidden w-40 shrink-0 border-r border-border bg-foreground p-3 sm:block">
          <div className="mb-4 px-1 text-[10px] font-semibold tracking-wide text-background/50 uppercase">
            Catalogue
          </div>
          <nav className="flex flex-col gap-0.5">
            {mockNav.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded px-2 py-1.5 text-[11.5px]",
                  i === 1 ? "bg-background/10 text-background" : "text-background/60",
                )}
              >
                <item.icon className="size-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Catalogue</p>
              <p className="text-sm font-semibold">Physical datasets</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">
              <Search className="size-3" />
              Search…
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_72px] gap-2 border-b border-border bg-muted/40 px-2.5 py-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              <span>Dataset</span>
              <span>SOR</span>
              <span>Class.</span>
              <span>Bound</span>
            </div>
            {mockRows.map((r, i) => (
              <div
                key={r.name}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto_72px] items-center gap-2 px-2.5 py-2 text-[11px]",
                  i < mockRows.length - 1 && "border-b border-border",
                )}
              >
                <span className="truncate font-medium">{r.name}</span>
                <Badge variant="secondary" className="h-4.5 px-1.5 text-[10px] font-normal">
                  {r.sor}
                </Badge>
                <Badge variant="outline" className="h-4.5 px-1.5 text-[10px] font-normal">
                  {r.cls}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-8 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.bound}%`, backgroundColor: stageColors[i % stageColors.length] }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{r.bound}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LandingPage({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---------- Nav ---------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex h-14 w-full items-center justify-between px-6 lg:px-10 xl:px-14">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-7 items-center justify-center rounded-md bg-primary text-[13px] font-semibold text-primary-foreground"
              aria-hidden="true"
            >
              C
            </div>
            <span className="text-sm font-semibold">CIB Data Marketplace</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <NavLink id="capabilities">Capabilities</NavLink>
            <NavLink id="how-it-works">How it works</NavLink>
            <NavLink id="faq">FAQ</NavLink>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button size="sm" onClick={onOpenWorkspace}>
              Open workspace <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5 px-4" aria-label="Primary">
                <NavLink id="capabilities">Capabilities</NavLink>
                <NavLink id="how-it-works">How it works</NavLink>
                <NavLink id="faq">FAQ</NavLink>
                <Button className="w-full" onClick={onOpenWorkspace}>
                  Open workspace <ArrowRight className="size-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ---------- Hero — gradient-washed, product preview with color glow ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            background:
              "radial-gradient(60% 55% at 12% 0%, var(--stage-produce), transparent 70%), radial-gradient(50% 50% at 88% 8%, var(--stage-share), transparent 70%)",
          }}
        />
        <div className="relative w-full px-6 py-10 lg:px-10 lg:py-12 xl:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-[2.9rem]">
                Data that moves the firm forward.
              </h1>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                The single governed marketplace for the firm's data — find it, understand
                it, get access.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button onClick={onOpenWorkspace} className="shadow-[0_8px_24px_-8px_var(--primary)]">
                  Open workspace <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" onClick={() => scrollToId("how-it-works")}>
                  See how it works
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-25 blur-2xl"
                style={{ background: `linear-gradient(135deg, ${stageColors.join(", ")})` }}
              />
              <ProductPreview />
            </div>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6 sm:grid-cols-5">
            {metrics.map((m, i) => {
              const color = stageColors[i % stageColors.length]
              return (
                <div key={m.key} className="rounded-lg border border-border bg-card px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <div className="text-lg font-semibold tracking-tight">{m.value}</div>
                  </div>
                  <div className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">{m.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Capabilities — dense divided list, not padded cards ---------- */}
      <section id="capabilities" className="w-full px-6 pt-8 pb-12 lg:px-10 xl:px-14">
        <div className="mb-6">
          <Kicker color="var(--stage-produce)">Platform capabilities</Kicker>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Six reasons data moves with confidence.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = capIcons[i] ?? Database
            const color = stageColors[i % stageColors.length]
            return (
              <Card
                key={c.n}
                className="gap-3 overflow-hidden border-t-2 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTopColor: c.ai ? "var(--stage-share)" : color }}
              >
                <div className="px-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex size-9 items-center justify-center rounded-md"
                      style={
                        c.ai
                          ? { background: `linear-gradient(135deg, ${stageColors.join(", ")})`, color: "white" }
                          : { backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)`, color }
                      }
                    >
                      <Icon className="size-4.5" />
                    </div>
                    {c.ai ? (
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                        {c.aiTag}
                      </Badge>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground/50">{c.n}</span>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{c.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{c.body}</p>
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: c.ai ? "var(--stage-share)" : color }}
                  >
                    Learn more <ArrowRight className="size-3" />
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ---------- How it works — compact bordered stepper ---------- */}
      <section id="how-it-works" className="border-y border-border bg-muted/20">
        <div className="w-full px-6 py-12 lg:px-10 xl:px-14">
          <div className="mb-8 max-w-xl">
            <Kicker color="var(--stage-govern)">How it works</Kicker>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
              From one team to another — safely, and traceably.
            </h2>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-[1.125rem] right-[10%] left-[10%] hidden h-px lg:block"
              style={{ background: `linear-gradient(90deg, ${stageColors.join(", ")})`, opacity: 0.4 }}
            />
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {pipeline.map((s, i) => {
                const Icon = pipelineIcons[i] ?? Database
                return (
                  <div
                    key={s.n}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-3 py-5 text-center transition-shadow hover:shadow-sm"
                  >
                    <div
                      className="flex size-9 items-center justify-center rounded-full text-white ring-4 ring-background"
                      style={{ backgroundColor: stageColors[i] }}
                    >
                      <Icon className="size-4.5" />
                    </div>
                    <h3 className="text-sm font-semibold">{s.title}</h3>
                    <p className="text-xs leading-snug text-muted-foreground">{s.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="w-full px-6 py-12 lg:px-10 xl:px-14">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div>
            <Kicker color="var(--stage-consume)">Frequently asked</Kicker>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">Questions, answered.</h2>
            <p className="mt-2.5 text-sm text-muted-foreground">
              The essentials on ownership, governance, and how classification works.
            </p>
            <div className="mt-5 rounded-lg border border-border p-4">
              <div
                className="flex size-8 items-center justify-center rounded-md"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--stage-publish) 14%, transparent)",
                  color: "var(--stage-publish)",
                }}
              >
                <Mail className="size-4" />
              </div>
              <p className="mt-2.5 text-sm font-medium">Still have questions?</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Reach the Data Marketplace governance team.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-[15px] font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border">
        <div className="flex w-full flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row lg:px-10 xl:px-14">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">Data Marketplace</span>
            <span>· CIB Data Services · Internal use only</span>
          </div>
          <div>© 2026 Wells Fargo</div>
        </div>
      </footer>
    </div>
  )
}
