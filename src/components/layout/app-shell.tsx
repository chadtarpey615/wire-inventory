"use client";

import Sidebar from "./sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
