"use client";

import { SearchProvider } from "@/components/Layouts/header";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </SidebarProvider>
  );
}
