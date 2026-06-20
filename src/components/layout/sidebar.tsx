"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Layers, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Spools", href: "/spools", icon: Package },
  { name: "Wire Types", href: "/wire-types", icon: Layers },
  { name: "Usage Log", href: "/usage", icon: Scissors },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Wire Inventory</h1>

      <nav className="flex flex-col gap-2">
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition",
                active
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/50",
              )}
            >
              <Icon size={18} />
              {name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-slate-600">
        © {new Date().getFullYear()} C & K Low Voltage
      </div>
    </aside>
  );
}
