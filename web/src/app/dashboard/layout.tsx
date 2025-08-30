"use client";

import { useAuth } from "@/hooks/use-auth";
import LoadingPage from "@/components/loading-page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./_components/sidebar";
import { Topbar } from "./_components/topbar";
import Chat from "./_components/chat";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/contexts/sidebar-context";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col flex-1 min-w-0 pr-4"
        >
          <div className="sticky top-0 z-10 bg-background px-6 py-4">
            <Topbar />
          </div>
          <div className="flex-1 overflow-y-auto p-6 border rounded-t-xl">
            {children}
          </div>
        </motion.div>
        <Chat isOpen={false} />
      </div>
    </SidebarProvider>
  );
}