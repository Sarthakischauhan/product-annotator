"use client";

import { ComponentRef, RefObject } from "react";
import Controls from "./Controls";
import Messages from "./Messages";
import ProductStage from "./ProductStage";
import StartCall from "./StartCall";
import type { Hume } from "hume";

type ProductReviewWorkspaceProps = (
  | { accessToken: string; apiKey?: never }
  | { apiKey: string; accessToken?: never }
) & {
  messageRef: RefObject<ComponentRef<typeof Messages> | null>;
  sessionSettings?: Hume.empathicVoice.SessionSettings;
};

export default function ProductReviewWorkspace({
  accessToken,
  apiKey,
  messageRef,
  sessionSettings,
}: ProductReviewWorkspaceProps) {
  return (
    <main className="grid min-h-0 grow grid-cols-1 bg-background text-foreground lg:grid-cols-[minmax(360px,0.92fr)_minmax(0,1.35fr)]">
      <section className="flex min-h-[48vh] flex-col border-b border-border bg-card lg:min-h-0 lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-5 py-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Product review call
          </div>
          <div className="mt-1 flex items-end justify-between gap-4">
            <h1 className="text-2xl font-semibold leading-none">
              Transcript
            </h1>
            <div className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              Live notes
            </div>
          </div>
        </div>

        <Messages ref={messageRef} />

        <div className="border-t border-border bg-background p-4">
          <Controls />
          <StartCall
            {...(apiKey != null
              ? { apiKey }
              : { accessToken: accessToken! })}
            sessionSettings={sessionSettings}
          />
        </div>
      </section>

      <section className="relative min-h-[52vh] overflow-hidden bg-background lg:min-h-0">
        <ProductStage />
      </section>
    </main>
  );
}
