import { useState } from "react"
import {
  Bell,
  Database,
  GitCommitHorizontal,
  Workflow,
  BookOpenCheck,
  ShieldCheck,
  LayoutGrid,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Flame,
  Gauge,
  Clock,
  Boxes,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const stageColors = [
  "var(--stage-produce)",
  "var(--stage-publish)",
  "var(--stage-govern)",
  "var(--stage-share)",
  "var(--stage-consume)",
] as const

const navGroups = [
  {
    label: "Workspace",
    items: [
      { icon: LayoutGrid, label: "Console" },
      { icon: Database, label: "Physical datasets", active: true },
      { icon: GitCommitHorizontal, label: "Bind columns" },
      { icon: Workflow, label: "Workflow" },
    ],
  },
  {
    label: "Governance",
    items: [
      { icon: BookOpenCheck, label: "Glossary" },
      { icon: ShieldCheck, label: "Governance" },
    ],
  },
]

const stats = [
  { key: "datasets", value: 6, label: "Physical datasets", icon: Boxes, color: stageColors[0] },
  { key: "bound", value: "82%", label: "Avg. bound", icon: Gauge, color: stageColors[1] },
  { key: "pending", value: 2, label: "Pending review", icon: Clock, color: stageColors[2] },
  { key: "elements", value: 74, label: "Data elements", icon: Flame, color: stageColors[4] },
]

const datasets = [
  { name: "Endur OTC Commodity Trades", owner: "Commodities Desk", sor: "Endur", cls: "Internal", bound: 78, updated: "2d ago" },
  { name: "1CAT Investments Trades", owner: "Investments Ops", sor: "Catalyst", cls: "Internal", bound: 78, updated: "3d ago" },
  { name: "Endur Composer Child Trades", owner: "Commodities Desk", sor: "Endur", cls: "Confidential", bound: 62, updated: "1w ago" },
  { name: "Endur P&L and Greeks", owner: "Market Risk", sor: "Endur", cls: "Internal", bound: 91, updated: "5h ago" },
  { name: "Catalyst Position Snapshot", owner: "Investments Ops", sor: "Catalyst", cls: "Internal", bound: 88, updated: "1d ago" },
  { name: "OTC Counterparty Exposure", owner: "Credit Risk", sor: "Endur", cls: "Confidential", bound: 54, updated: "4d ago" },
]

const classificationDot: Record<string, string> = {
  Internal: "var(--stage-consume)",
  Confidential: "var(--destructive)",
}

export function ConsolePage({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState("Physical datasets")

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* ---------- Top bar ---------- */}
      <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, ${stageColors.join(", ")})`, opacity: 0.5 }}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-md py-1.5 pr-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-6.5 items-center justify-center rounded-md bg-primary text-[12px] font-semibold text-primary-foreground">
              C
            </div>
            <span className="text-sm font-semibold">CIB Data Marketplace</span>
          </button>
          <ChevronRight className="size-3.5 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">Physical datasets</span>
        </div>

        <div className="hidden items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors focus-within:border-ring sm:flex sm:w-72">
          <Search className="size-3.5" />
          Search datasets, terms, owners…
        </div>

        <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-2">
            <div
              className="flex size-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${stageColors[0]}, ${stageColors[1]})` }}
            >
              NN
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs font-medium">Naresh Nimmala</div>
              <div className="text-[10.5px] text-muted-foreground">Data Steward</div>
            </div>
            <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ---------- Sidebar ---------- */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-muted/15 sm:flex">
          <div className="relative m-3 overflow-hidden rounded-lg border border-border bg-card p-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -right-6 size-16 rounded-full opacity-20 blur-xl"
              style={{ background: `linear-gradient(135deg, ${stageColors[0]}, ${stageColors[1]})` }}
            />
            <div className="relative flex items-center gap-2">
              <div
                className="flex size-8 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${stageColors[0]}, ${stageColors[1]})` }}
              >
                NN
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold">Welcome back, Naresh</div>
                <div className="text-[10.5px] text-muted-foreground">Commodities Desk</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto px-3 pb-3">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-2.5 pb-1 text-[10px] font-semibold tracking-wide text-muted-foreground/70 uppercase">
                  {group.label}
                </p>
                <nav className="flex flex-col gap-0.5" aria-label={group.label}>
                  {group.items.map((item) => {
                    const isActive = active === item.label
                    return (
                      <button
                        key={item.label}
                        onClick={() => setActive(item.label)}
                        className={cn(
                          "relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[14.5px] font-medium transition-colors",
                          isActive
                            ? "bg-primary/8 text-primary"
                            : "text-foreground/75 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {isActive ? (
                          <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                        ) : null}
                        <item.icon className="size-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="mt-auto p-3">
            <div className="rounded-lg border border-border bg-gradient-to-br from-card to-muted/30 p-3">
              <p className="text-xs font-medium">Need access to a dataset?</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Request bindings through the governance queue.
              </p>
              <Button size="sm" variant="outline" className="mt-2 h-7 w-full text-xs">
                Request access
              </Button>
            </div>
          </div>
        </aside>

        {/* ---------- Main ---------- */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Physical datasets</h1>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Datasets your team owns or has bound access to.
                </p>
              </div>
              <Button size="sm" className="shadow-[0_6px_16px_-6px_var(--primary)]">
                <Plus className="size-4" /> New dataset
              </Button>
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

            <Card className="mt-5 gap-0 overflow-hidden py-0">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors focus-within:border-ring">
                  <Search className="size-3.5" />
                  Filter datasets…
                </div>
                <span className="text-xs text-muted-foreground">{datasets.length} datasets</span>
              </div>

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
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
