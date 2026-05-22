"use client";

import { CircleGauge, RotateCcw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function ProductStage() {
  const reviewNotes: [string, string, LucideIcon][] = [
    ["Model", "Sketchfab embedded asset", Sparkles],
    ["Interaction", "Orbit + zoom enabled", RotateCcw],
    ["Format", "Realtime 3D viewer", CircleGauge],
  ];

  return (
    <div className="relative h-full w-full overflow-hidden border border-border bg-background">
      {/* Sketchfab iframe */}
      <iframe
        title="Starbucks Disposable Cup"
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/b1b9085153d44b9c89111ee26c927259/embed?autostart=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0&ui_theme=dark"
      />

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-background/20" />

      {/* Top copy */}
      <div className="pointer-events-none absolute left-6 top-6 max-w-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Physical product
        </div>

        <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
          Starbucks Cup
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Interactive Sketchfab 3D embed with orbit controls, lighting, and
          realtime rendering.
        </p>
      </div>

      {/* Bottom cards */}
      <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
        {reviewNotes.map(([label, value, Icon]) => (
          <div
            key={label}
            className="border border-border bg-background/80 p-3 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Icon className="size-3.5" />
              {label}
            </div>

            <div className="mt-2 text-sm font-medium text-foreground">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
