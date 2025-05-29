"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout; 