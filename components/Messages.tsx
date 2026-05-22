"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <motion.div
      layoutScroll
      className={"min-h-0 grow overflow-auto px-4 py-5"}
      ref={ref}
    >
      <motion.div
        className={"mx-auto flex w-full max-w-2xl flex-col gap-3"}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.length === 0 ? (
            <div className="border border-dashed border-border bg-muted p-5 text-sm leading-6 text-muted-foreground">
              Start the review call to capture customer reactions, objections,
              feature requests, and product notes here.
            </div>
          ) : null}
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[88%]",
                    "bg-card",
                    "border border-border",
                    "shadow-sm",
                    msg.type === "user_message" ? "ml-auto" : "",
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    className={cn(
                      "px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
                    )}
                  >
                    {msg.message.role}
                  </div>
                  <div className={"px-4 pb-4 pt-2 text-sm leading-6 text-card-foreground"}>
                    {msg.message.content}
                  </div>
                  <Expressions values={msg.models.prosody?.scores} />
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
