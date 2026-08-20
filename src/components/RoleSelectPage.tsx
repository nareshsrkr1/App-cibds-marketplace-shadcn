import { ArrowRight, Lock } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { personas, type PersonaKey } from "@/data/personas"

const stageColors = [
  "var(--stage-produce)",
  "var(--stage-publish)",
  "var(--stage-govern)",
  "var(--stage-share)",
  "var(--stage-consume)",
] as const

export function RoleSelectPage({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (persona: PersonaKey) => void
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(55% 50% at 15% 0%, var(--stage-produce), transparent 70%), radial-gradient(45% 45% at 85% 10%, var(--stage-share), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-3xl">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex size-9 items-center justify-center rounded-md bg-primary text-[15px] font-semibold text-primary-foreground"
            aria-hidden="true"
          >
            C
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Naresh, choose how you want to work today.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're assigned multiple roles on the Data Marketplace. Pick one to continue — you can
            switch anytime from inside the workspace.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {personas.map((p) => (
            <Card
              key={p.key}
              role={p.assigned ? "button" : undefined}
              tabIndex={p.assigned ? 0 : undefined}
              onClick={() => p.assigned && onSelect(p.key)}
              onKeyDown={(e) => {
                if (p.assigned && (e.key === "Enter" || e.key === " ")) onSelect(p.key)
              }}
              className={cn(
                "gap-3 border-t-2 py-4 transition-all",
                p.assigned
                  ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                  : "cursor-not-allowed opacity-55",
              )}
              style={{ borderTopColor: p.color }}
            >
              <div className="px-4">
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-9 items-center justify-center rounded-md"
                    style={{ backgroundColor: `color-mix(in oklch, ${p.color} 16%, transparent)`, color: p.color }}
                  >
                    <p.icon className="size-4.5" />
                  </div>
                  {p.assigned ? (
                    <ArrowRight className="size-4 text-muted-foreground/40" />
                  ) : (
                    <span className="flex items-center gap-1 text-[10.5px] font-medium text-muted-foreground/60">
                      <Lock className="size-3" /> Not assigned
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-semibold">{p.label}</h3>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{p.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          {stageColors.map((c) => (
            <span key={c} className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        <button
          onClick={onBack}
          className="mx-auto mt-4 block text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Cancel
        </button>
      </div>
    </div>
  )
}
