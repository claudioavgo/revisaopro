import { cn } from "@/lib/utils";
import { PromptInputWithActions } from "./chat/chat-input";
import { AnimatePresence, motion } from "framer-motion";

export default function Chat({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{
        opacity: 1,
        width: isOpen ? "min(400px, 33vw)" : "0px",
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 40
      }}
      className={cn("relative h-screen shrink-0 group/chat overflow-hidden bg-background")}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="h-full flex flex-col justify-center items-center">
            <Announcement isOpen={isOpen} />
          </div>
        </div>
        <div className="sticky bottom-0 bg-background p-4">
          <PromptInputWithActions />
        </div>
      </div>
    </motion.div>
  );
}

function Announcement({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="footer"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          exit={{ opacity: 0, y: -18, transition: { duration: 0.01 } }}
          className="rounded-2xl border bg-muted/30 p-3 text-xs text-muted-foreground select-none"
        >
          <h1 className="text-2xl font-bold">Seja bem-vindo ao melhor app de revisão!</h1>
          <p className="text-sm text-muted-foreground">
            Aqui você pode revisar seus conteúdos de forma rápida e eficiente.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}