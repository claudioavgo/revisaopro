"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NewContentModal } from "./new-content-modal";
import { useAuth } from "@/hooks/use-auth";
import { useSidebar } from "@/contexts/sidebar-context";

export function Topbar() {
  const { currentPageName } = useSidebar();
  const { logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="flex items-center justify-between"
    >
      <h1
        className="text-2xl font-bold"
      >
        {currentPageName}
      </h1>
      <div
        className="flex items-center gap-2"
      >
        <NewContentModal />
        <Button variant="flat" onClick={logout}>
          Sair
        </Button>
      </div>
    </motion.div>
  );
}