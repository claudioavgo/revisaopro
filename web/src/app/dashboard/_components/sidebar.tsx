"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Book, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/hooks/use-sidebar";

type Item = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const sidebarItems: Item[] = [
  { icon: <Book className="w-5 h-5" />, label: "Aprender", href: "/dashboard" },
  { icon: <Settings className="w-5 h-5" />, label: "Configurações", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const { currentPage, isOpen, toggleSidebar } = useSidebar();

  const activeMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const it of sidebarItems) map[it.href] = currentPage === it.href;
    return map;
  }, [currentPage]);

  return (
    <TooltipProvider delayDuration={200}>
      <motion.aside
        aria-label="Barra lateral de navegação"
        aria-expanded={isOpen}
        initial={false}
        animate={{ width: isOpen ? 264 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
        className={cn(
          "relative h-screen shrink-0 group/sidebar",
          isOpen ? "cursor-[w-resize]" : "cursor-[e-resize]"
        )}
        onClick={toggleSidebar}
        title={isOpen ? "Clique para fechar (←)" : "Clique para abrir (→)"}
      >
        <div className="flex h-full flex-col gap-3 p-3">
          <div className="flex items-center justify-between rounded-2xl px-2 py-2">
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.h1
                  key="logo-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -8, transition: { duration: 0.01 } }}
                  className="text-xl font-bold tracking-tight select-none h-8"
                >
                  REVISAO.PRO
                </motion.h1>
              )}

              {!isOpen && (
                <motion.h1
                  key="logo-mini"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 8, transition: { duration: 0.01 } }}
                  className="flex justify-center items-center text-xl font-bold tracking-tight select-none size-8 bg-primary rounded-md"
                >
                  <p className="text-background font-bold font-mono">R</p>
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          <nav
            className="mt-1 flex w-full flex-1 flex-col gap-2"
          >
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                isActive={!!activeMap[item.href]}
                isOpen={isOpen}
              />
            ))}
          </nav>

          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="footer"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0, y: -18, transition: { duration: 0.01 } }}
                  className="rounded-2xl border bg-muted/30 p-3 text-xs text-muted-foreground select-none"
                >
                  <p className="leading-relaxed">
                    Dica: use <kbd className="rounded bg-muted px-1 py-0.5 text-[10px]">Ctrl/Cmd+B</kbd>{" "}
                    para alternar.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

function SidebarItem({
  item,
  isActive,
  isOpen,
}: {
  item: Item;
  isActive: boolean;
  isOpen: boolean;
}) {
  const base =
    "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm outline-none transition-colors";
  const state = isActive
    ? "bg-muted/60 text-foreground"
    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground";

  return (
    <Tooltip open={isOpen ? false : undefined}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(base, state, "cursor-pointer")}
          aria-current={isActive ? "page" : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.span layout whileTap={{ scale: 0.98 }}>
            {item.icon}
          </motion.span>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.span
                key="label"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="truncate font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </TooltipTrigger>

      <TooltipContent side="right" className="px-2 py-1 text-xs">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}
