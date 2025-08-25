"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextProps {
  currentPage: string;
  currentPageName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

const pageNames: Record<string, string> = {
  "/dashboard": "Documentos",
  "/dashboard/settings": "Configurações",
};

const getPageName = (pathname: string): string => {
  if (pageNames[pathname]) {
    return pageNames[pathname];
  }

  if (pathname.startsWith("/dashboard/documents/")) {
    return "Documento";
  }

  return pathname;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        currentPage: pathname,
        currentPageName: getPageName(pathname),
        isOpen,
        setIsOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar deve ser usado dentro de um SidebarProvider')
  }
  return context
}
