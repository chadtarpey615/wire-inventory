import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InventoryPage() {
  const spools = await prisma.wireSpool.findMany({
    include: {
      wireType: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>

      {spools.length === 0 && (
        <p className="text-slate-400">
          No wire spools yet. Add one to get started.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {spools.map((spool) => (
          <Link
            key={spool.id}
            href={`/inventory/${spool.id}`}
            className="block"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:bg-slate-800 transition">
              {/* Top Row */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{spool.label}</h2>
                <span className="text-xs text-slate-400">
                  {spool.wireType?.name}
                </span>
              </div>

              {/* Body */}
              <div className="text-slate-300 space-y-1">
                <div className="text-sm">
                  <span className="font-medium">{spool.remainingFeet}</span> ft
                  remaining
                </div>

                <div className="text-sm text-slate-400">
                  Total: {spool.lengthFeet} ft
                </div>

                {spool.location && (
                  <div className="text-sm text-slate-400">
                    Location: {spool.location}
                  </div>
                )}

                {/* Low stock warning */}
                {spool.remainingFeet <= spool.lowStockAt && (
                  <div className="text-xs text-red-400 font-semibold mt-2">
                    Low Stock (below {spool.lowStockAt} ft)
                  </div>
                )}

                <div className="text-xs text-slate-500 mt-3">
                  Added: {spool.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
