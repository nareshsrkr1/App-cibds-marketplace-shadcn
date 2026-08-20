import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Mail,
  Search,
  LayoutGrid,
  GitCommitHorizontal,
  Workflow,
  Sprout,
  UploadCloud,
  ShieldCheck,
  Share2,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

const pipelineIcons = [Sprout, UploadCloud, ShieldCheck, Share2, Download]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function NavLink({ id, children, dark }: { id: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(id)
      }}
      className={cn(
        "text-sm transition-colors",
        dark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </a>
  )
}

// A quadratic-bezier arc through 5 points, so nodes sit exactly on the drawn curve.
const ARC_PATH = "M20,210 Q290,20 560,210"
const ARC_NODES = [
  { x: 20, y: 210 },
  { x: 156, y: 138 },
  { x: 290, y: 113 },
  { x: 424, y: 138 },
  { x: 560, y: 210 },
]

/** The hero's centerpiece — a lit arc connecting the five pipeline stages,
 * replacing the usual browser-chrome screenshot with something that reads
 * as a journey rather than a static product shot. */
function JourneyArc() {
  return (
    <svg viewBox="0 0 580 250" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="arc-line" x1="0" y1="0" x2="1" y2="0">
          {stageColors.map((c, i) => (
            <stop key={c} offset={`${(i / (stageColors.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={ARC_PATH} fill="none" stroke="var(--background)" strokeOpacity={0.08} strokeWidth={10} strokeLinecap="round" />
      <path d={ARC_PATH} fill="none" stroke="url(#arc-line)" strokeWidth={2.5} strokeLinecap="round" filter="url(#arc-glow)" />

      {ARC_NODES.map((pt, i) => {
        const s = pipeline[i]
        const labelBelow = i % 2 === 0
        return (
          <g key={s.n}>
            <circle cx={pt.x} cy={pt.y} r={16} fill={stageColors[i]} opacity={0.18} />
            <circle cx={pt.x} cy={pt.y} r={7} fill={stageColors[i]} filter="url(#arc-glow)" />
            <text
              x={pt.x}
              y={labelBelow ? pt.y + 34 : pt.y - 22}
              textAnchor="middle"
              className="fill-background text-[15px] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.title}
            </text>
            <text
              x={pt.x}
              y={labelBelow ? pt.y + 52 : pt.y - 4}
              textAnchor="middle"
              className="fill-background text-[10.5px]"
              opacity={0.55}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.n === "1" ? "starts here" : s.n === "5" ? "ends here" : ""}
            </text>
          </g>
        )
      })}
    </svg>
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
  { icon: Sprout, label: "Physical datasets" },
  { icon: GitCommitHorizontal, label: "Bind columns" },
  { icon: Workflow, label: "Workflow" },
]

function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/[0.08]">
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
      {/* ---------- Nav — floating pill, sits on the dark hero ---------- */}
      <header className="sticky top-4 z-40 px-4">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between rounded-full border border-background/10 bg-foreground/95 px-3 pl-5 text-background shadow-lg shadow-black/20 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-6.5 items-center justify-center rounded-full text-[12px] font-semibold text-foreground"
              style={{ background: `linear-gradient(135deg, ${stageColors.join(", ")})` }}
              aria-hidden="true"
            >
              C
            </div>
            <span className="text-sm font-semibold">CIB Data Marketplace</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            <NavLink id="how-it-works" dark>How it works</NavLink>
            <NavLink id="capabilities" dark>Capabilities</NavLink>
            <NavLink id="faq" dark>FAQ</NavLink>
          </nav>

          <div className="hidden items-center md:flex">
            <Button
              size="sm"
              onClick={onOpenWorkspace}
              className="rounded-full bg-background text-foreground hover:bg-background/90"
            >
              Open workspace <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-background hover:bg-background/10 hover:text-background md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5 px-4" aria-label="Primary">
                <NavLink id="how-it-works">How it works</NavLink>
                <NavLink id="capabilities">Capabilities</NavLink>
                <NavLink id="faq">FAQ</NavLink>
                <Button className="w-full" onClick={onOpenWorkspace}>
                  Open workspace <ArrowRight className="size-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ---------- Hero — dark canvas, the arc is the visual anchor ---------- */}
      <section className="relative -mt-[4.5rem] overflow-hidden bg-foreground pt-[4.5rem] text-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(45% 40% at 20% 15%, color-mix(in oklch, var(--stage-produce) 35%, transparent), transparent 70%), radial-gradient(40% 35% at 85% 10%, color-mix(in oklch, var(--stage-share) 30%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-8 text-center sm:pt-20">
          <Badge className="mb-5 rounded-full border-background/15 bg-background/10 px-3 py-1 text-background" variant="outline">
            Wells Fargo · CIB Data Services
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
            Every dataset has a journey.
            <br className="hidden sm:block" /> We make it a trusted one.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-background/65">
            The single governed marketplace for the firm's data — from the desk that
            creates it to the team that relies on it.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={onOpenWorkspace} size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
              Open workspace <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToId("how-it-works")}
              className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10"
            >
              See how it works
            </Button>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <JourneyArc />
          </div>
        </div>

        {/* Metrics bridge the dark hero and the light page below */}
        <div className="relative mx-auto max-w-[1000px] px-6">
          <div className="grid -translate-y-1/2 grid-cols-3 gap-3 rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/10 sm:grid-cols-5 sm:p-5">
            {metrics.map((m, i) => (
              <div key={m.key} className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                  <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: stageColors[i % stageColors.length] }} />
                  <div className="text-xl font-semibold tracking-tight text-foreground">{m.value}</div>
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works — the journey, made concrete with the real workspace ---------- */}
      <section id="how-it-works" className="mx-auto max-w-[1200px] px-6 pt-2 pb-16 sm:pt-4">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">How it works</p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
              From one team to another — safely, and traceably.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This is the actual workspace, not a mockup of one. A producer lists a
              dataset; it's checked and classified; a consumer finds it, requests it,
              and gets a governed feed — every step recorded.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {pipeline.map((s, i) => {
                const Icon = pipelineIcons[i] ?? Sprout
                return (
                  <div key={s.n} className="flex items-center gap-3">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: stageColors[i] }}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-semibold">{s.title}</span>
                      <span className="text-sm text-muted-foreground"> — {s.body}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      {/* ---------- Capabilities — editorial numbered list, ghost numerals ---------- */}
      <section id="capabilities" className="border-t border-border bg-card/60 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10 max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Platform capabilities</p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Six reasons data moves with confidence.
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {capabilities.map((c, i) => {
              const color = stageColors[i % stageColors.length]
              return (
                <div
                  key={c.n}
                  className="group relative flex items-start gap-5 border-b border-border py-6 first:border-t sm:[&:nth-child(2)]:border-t"
                >
                  <span
                    className="pointer-events-none select-none text-[2.75rem] leading-none font-bold tracking-tighter text-muted-foreground/15 transition-colors group-hover:text-muted-foreground/25"
                    style={{ WebkitTextStroke: "1px transparent" }}
                  >
                    {c.n}
                  </span>
                  <div className="min-w-0 pt-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-semibold">{c.title}</h3>
                      {c.ai ? (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                          {c.aiTag}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                  <span
                    className="absolute top-0 left-0 h-6 w-0.5 origin-top scale-y-0 rounded-full transition-transform duration-200 group-hover:scale-y-100"
                    style={{ backgroundColor: color }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Frequently asked</p>
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

      {/* ---------- Footer — dark band, bookends the hero ---------- */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
          <div className="flex items-center gap-2">
            <div
              className="flex size-6 items-center justify-center rounded-full text-[11px] font-semibold text-foreground"
              style={{ background: `linear-gradient(135deg, ${stageColors.join(", ")})` }}
            >
              C
            </div>
            <span className="font-semibold">Data Marketplace</span>
            <span className="text-background/50">· CIB Data Services · Internal use only</span>
          </div>
          <button
            onClick={onOpenWorkspace}
            className="flex items-center gap-1 text-background/70 transition-colors hover:text-background"
          >
            Open workspace <ArrowUpRight className="size-3.5" />
          </button>
        </div>
        <div className="border-t border-background/10 px-6 py-3 text-center text-xs text-background/40">
          © 2026 Wells Fargo
        </div>
      </footer>
    </div>
  )
}
