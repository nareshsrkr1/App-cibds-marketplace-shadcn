import { useState } from "react"
import {
  Bell,
  Database,
  LayoutGrid,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Flame,
  Gauge,
  Clock,
  Boxes,
  Menu,
  Check,
  Lock,
  History,
  Inbox,
  UploadCloud,
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { personas, type PersonaKey, type NavSection } from "@/data/personas"

const stageColors = [
  "var(--stage-produce)",
  "var(--stage-publish)",
  "var(--stage-govern)",
  "var(--stage-share)",
  "var(--stage-consume)",
] as const

const datasets = [
  { name: "Endur OTC Commodity Trades", owner: "Commodities Desk", sor: "Endur", cls: "Internal", bound: 78, updated: "2d ago" },
  { name: "1CAT Investments Trades", owner: "Investments Ops", sor: "Catalyst", cls: "Internal", bound: 78, updated: "3d ago" },
  { name: "Endur Composer Child Trades", owner: "Commodities Desk", sor: "Endur", cls: "Confidential", bound: 62, updated: "1w ago" },
  { name: "Endur P&L and Greeks", owner: "Market Risk", sor: "Endur", cls: "Internal", bound: 91, updated: "5h ago" },
  { name: "Catalyst Position Snapshot", owner: "Investments Ops", sor: "Catalyst", cls: "Internal", bound: 88, updated: "1d ago" },
  { name: "OTC Counterparty Exposure", owner: "Credit Risk", sor: "Endur", cls: "Confidential", bound: 54, updated: "4d ago" },
  { name: "Endur Physical Delivery Schedule", owner: "Commodities Desk", sor: "Endur", cls: "Internal", bound: 71, updated: "6h ago" },
  { name: "Catalyst Margin Calls", owner: "Investments Ops", sor: "Catalyst", cls: "Confidential", bound: 66, updated: "2d ago" },
  { name: "Market Risk VaR Snapshot", owner: "Market Risk", sor: "Endur", cls: "Internal", bound: 84, updated: "12h ago" },
  { name: "Credit Limits by Counterparty", owner: "Credit Risk", sor: "Catalyst", cls: "Confidential", bound: 59, updated: "3d ago" },
  { name: "Corporate Treasury Cash Positions", owner: "Corporate Treasury", sor: "Endur", cls: "Internal", bound: 95, updated: "1h ago" },
  { name: "Compliance Trade Surveillance Feed", owner: "Compliance", sor: "Catalyst", cls: "Confidential", bound: 73, updated: "8h ago" },
  { name: "Endur Settlement Instructions", owner: "Commodities Desk", sor: "Endur", cls: "Internal", bound: 80, updated: "1d ago" },
  { name: "Catalyst Trade Confirmations", owner: "Investments Ops", sor: "Catalyst", cls: "Internal", bound: 87, updated: "4h ago" },
  { name: "Market Risk Stress Test Results", owner: "Market Risk", sor: "Endur", cls: "Confidential", bound: 48, updated: "5d ago" },
  { name: "Corporate Treasury FX Exposure", owner: "Corporate Treasury", sor: "Catalyst", cls: "Internal", bound: 92, updated: "9h ago" },
]

const stats = [
  { key: "datasets", value: datasets.length, label: "Physical datasets", icon: Boxes, color: stageColors[0] },
  { key: "bound", value: "78%", label: "Avg. bound", icon: Gauge, color: stageColors[1] },
  { key: "pending", value: 3, label: "Pending review", icon: Clock, color: stageColors[2] },
  { key: "elements", value: 74, label: "Data elements", icon: Flame, color: stageColors[4] },
]

const classificationDot: Record<string, string> = {
  Internal: "var(--stage-consume)",
  Confidential: "var(--destructive)",
}

const activity = [
  { icon: UploadCloud, text: "You published Endur Settlement Instructions", time: "1h ago", color: stageColors[1] },
  { icon: KeyRound, text: "Market Risk requested access to VaR Snapshot", time: "3h ago", color: stageColors[3] },
  { icon: ShieldCheck, text: "Classification confirmed on Credit Limits by Counterparty", time: "6h ago", color: stageColors[2] },
  { icon: Check, text: "Governance approved OTC Counterparty Exposure", time: "1d ago", color: stageColors[4] },
]

const approvals = [
  { name: "Credit Limits by Counterparty", requester: "Market Risk", type: "Access request" },
  { name: "settlement_ccy", requester: "Compliance", type: "New glossary term" },
  { name: "Endur Composer Child Trades", requester: "Investments Ops", type: "Access request" },
]

function SidebarNav({
  active,
  onSelect,
  navTop,
  navSections,
}: {
  active: string
  onSelect: (label: string) => void
  navTop: string[]
  navSections: NavSection[]
}) {
  return (
    <>
      <div className="m-3 flex items-center gap-2 rounded-lg border border-border p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          NN
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold">Naresh Nimmala</div>
          <div className="text-[10.5px] text-muted-foreground">Commodities Desk</div>
        </div>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-3">
        {/* Top-level items with no sub-menu */}
        <nav className="mb-1 flex flex-col gap-0.5" aria-label="Top">
          {navTop.map((label) => {
            const isActive = active === label
            return (
              <button
                key={label}
                onClick={() => onSelect(label)}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[14.5px] font-semibold transition-colors",
                  isActive
                    ? "bg-primary/8 text-primary"
                    : "text-foreground/85 hover:bg-muted hover:text-foreground",
                )}
              >
                {isActive ? (
                  <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                ) : null}
                <LayoutGrid className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* Sections: a bold tab-level heading, with a lighter, indented sub-menu underneath */}
        <Accordion
          key={navSections.map((s) => s.key).join("-")}
          type="multiple"
          defaultValue={navSections.map((s) => s.key)}
          className="flex flex-col gap-0.5"
        >
          {navSections.map((section) => (
            <AccordionItem key={section.key} value={section.key} className="border-b-0">
              <AccordionTrigger className="rounded-md px-2.5 py-1.5 text-[14.5px] font-semibold text-foreground/85 hover:bg-muted hover:text-foreground hover:no-underline [&_svg]:size-3.5">
                <span className="flex items-center gap-2.5">
                  <section.icon className="size-4 shrink-0" />
                  {section.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-0.5 pb-1">
                <nav
                  className="ml-[1.05rem] flex flex-col gap-0.5 border-l border-border pl-3"
                  aria-label={section.label}
                >
                  {section.items.map((label) => {
                    const isActive = active === label
                    return (
                      <button
                        key={label}
                        onClick={() => onSelect(label)}
                        className={cn(
                          "relative rounded-md px-2 py-1.5 text-left text-[13px] font-normal transition-colors",
                          isActive
                            ? "bg-primary/8 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {isActive ? (
                          <span className="absolute top-1/2 -left-[13px] h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                        ) : null}
                        <span className="truncate">{label}</span>
                      </button>
                    )
                  })}
                </nav>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}

export function ConsolePage({
  persona,
  onBack,
  onSwitchRole,
}: {
  persona: PersonaKey
  onBack: () => void
  onSwitchRole: (persona: PersonaKey) => void
}) {
  const current = personas.find((p) => p.key === persona) ?? personas[0]
  const [active, setActive] = useState(current.navSections[0]?.items[0] ?? current.navTop[0])
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const selectNav = (label: string) => {
    setActive(label)
    setMobileNavOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-white text-foreground">
      {/* ---------- Top bar ---------- */}
      <header className="relative flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, ${stageColors.join(", ")})`, opacity: 0.5 }}
        />
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <button
              onClick={() => setMobileNavOpen(true)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <SheetContent side="left" className="flex w-64 flex-col p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <SidebarNav
                active={active}
                onSelect={selectNav}
                navTop={current.navTop}
                navSections={current.navSections}
              />
            </SheetContent>
          </Sheet>

          <button
            onClick={onBack}
            className="flex min-w-0 items-center gap-2 rounded-md py-1.5 pr-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-6.5 shrink-0 items-center justify-center rounded-md bg-primary text-[12px] font-semibold text-primary-foreground">
              C
            </div>
            <span className="truncate text-sm font-semibold">CIB Data Marketplace</span>
          </button>
          <ChevronRight className="hidden size-3.5 shrink-0 text-muted-foreground/50 sm:block" />
          <span className="hidden truncate text-sm text-muted-foreground sm:block">{active}</span>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors focus-within:border-ring md:flex md:w-72">
          <Search className="size-3.5" />
          Search datasets, terms, owners…
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            className="relative flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span
              className="absolute top-1.5 right-1.5 size-1.5 rounded-full"
              style={{ backgroundColor: "var(--stage-govern)" }}
            />
          </button>
          <Separator orientation="vertical" className="h-5" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-muted">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  NN
                </div>
                <div className="hidden text-left leading-tight sm:block">
                  <div className="text-xs font-medium">Naresh Nimmala</div>
                  <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                    <current.icon className="size-2.5" style={{ color: current.color }} />
                    {current.label}
                  </div>
                </div>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="font-normal">
                <div className="text-sm font-medium">Naresh Nimmala</div>
                <div className="text-xs text-muted-foreground">Data Steward · Commodities Desk</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="pb-1 text-[10px] font-semibold tracking-wide text-muted-foreground/70 uppercase">
                Switch role
              </DropdownMenuLabel>
              {personas.map((p) => {
                const isCurrent = p.key === persona
                return (
                  <DropdownMenuItem
                    key={p.key}
                    disabled={!p.assigned}
                    onSelect={() => p.assigned && onSwitchRole(p.key)}
                    className="gap-2.5"
                  >
                    <div
                      className="flex size-7 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `color-mix(in oklch, ${p.color} 16%, transparent)`, color: p.color }}
                    >
                      <p.icon className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium">{p.label}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{p.description}</div>
                    </div>
                    {isCurrent ? (
                      <Check className="size-4 shrink-0 text-primary" />
                    ) : !p.assigned ? (
                      <Lock className="size-3.5 shrink-0 text-muted-foreground/50" />
                    ) : null}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ---------- Sidebar (desktop) ---------- */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-white sm:flex">
          <SidebarNav
            active={active}
            onSelect={setActive}
            navTop={current.navTop}
            navSections={current.navSections}
          />
        </aside>

        {/* ---------- Main ---------- */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${stageColors.join(", ")})` }}
              />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {current.label} workspace
                  </p>
                  <h1 className="mt-0.5 text-xl font-semibold tracking-tight sm:text-2xl">
                    Welcome back, Naresh.
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Viewing <span className="font-medium text-foreground">{active}</span> — datasets
                    your team owns or has bound access to.
                  </p>
                </div>
                <Button className="shrink-0 shadow-[0_6px_16px_-6px_var(--primary)]">
                  <Plus className="size-4" /> New dataset
                </Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <Card
                  key={s.key}
                  className="gap-0 border-t-2 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderTopColor: s.color }}
                >
                  <div className="flex items-center justify-between px-3.5">
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{s.value}</div>
                      <div className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">{s.label}</div>
                    </div>
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `color-mix(in oklch, ${s.color} 16%, transparent)`, color: s.color }}
                    >
                      <s.icon className="size-4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
            <Card className="min-w-0 flex-1 gap-0 overflow-hidden py-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors focus-within:border-ring">
                  <Search className="size-3.5" />
                  Filter datasets…
                </div>
                <span className="text-xs text-muted-foreground">{datasets.length} datasets</span>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[1fr_auto_auto_100px_auto] gap-3 border-b border-border bg-muted/30 px-4 py-2 text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">
                    <span>Dataset</span>
                    <span>SOR</span>
                    <span>Classification</span>
                    <span>Bound</span>
                    <span>Updated</span>
                  </div>

                  {datasets.map((d, i) => {
                    const color = stageColors[i % stageColors.length]
                    return (
                      <div
                        key={d.name}
                        className={cn(
                          "group grid grid-cols-[1fr_auto_auto_100px_auto] items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/30",
                          i < datasets.length - 1 && "border-b border-border",
                        )}
                      >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className="flex size-7 shrink-0 items-center justify-center rounded-md"
                        style={{ backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)`, color }}
                      >
                        <Database className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium transition-colors group-hover:text-primary">
                          {d.name}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{d.owner}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10.5px] font-normal">
                      {d.sor}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-xs">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: classificationDot[d.cls] }}
                      />
                      {d.cls}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${d.bound}%`, backgroundColor: color }}
                        />
                      </div>
                      <span className="font-mono text-[10.5px] text-muted-foreground">{d.bound}%</span>
                    </div>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          {d.updated}
                          <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Right rail — activity + governance queue */}
            <div className="flex w-full shrink-0 flex-col gap-5 lg:w-72">
              <Card className="gap-0 py-0">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <History className="size-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Recent activity</span>
                </div>
                <div className="flex flex-col">
                  {activity.map((a, i) => (
                    <div
                      key={a.text}
                      className={cn(
                        "flex items-start gap-2.5 px-4 py-3",
                        i < activity.length - 1 && "border-b border-border",
                      )}
                    >
                      <div
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md"
                        style={{ backgroundColor: `color-mix(in oklch, ${a.color} 16%, transparent)`, color: a.color }}
                      >
                        <a.icon className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12.5px] leading-snug">{a.text}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="gap-0 py-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Inbox className="size-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Governance queue</span>
                  </div>
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10.5px] font-normal">
                    {approvals.length}
                  </Badge>
                </div>
                <div className="flex flex-col">
                  {approvals.map((a, i) => (
                    <div
                      key={a.name}
                      className={cn(
                        "px-4 py-3",
                        i < approvals.length - 1 && "border-b border-border",
                      )}
                    >
                      <p className="truncate text-[12.5px] font-medium">{a.name}</p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {a.type} · {a.requester}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="flex items-center justify-center gap-1.5 border-t border-border px-4 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-muted">
                  Review all <ArrowRight className="size-3.5" />
                </button>
              </Card>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
