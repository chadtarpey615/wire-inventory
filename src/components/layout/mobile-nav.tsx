import Link from "next/link";
import { Home, Package, PlusCircle, Settings } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-2 flex justify-between">
      <Link href="/" className="flex flex-col items-center text-zinc-400">
        <Home size={22} />
        <span className="text-xs">Home</span>
      </Link>

      <Link
        href="/inventory"
        className="flex flex-col items-center text-zinc-400"
      >
        <Package size={22} />
        <span className="text-xs">Inventory</span>
      </Link>

      <Link href="/add" className="flex flex-col items-center text-zinc-400">
        <PlusCircle size={22} />
        <span className="text-xs">Add</span>
      </Link>

      <Link
        href="/settings"
        className="flex flex-col items-center text-zinc-400"
      >
        <Settings size={22} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
}
