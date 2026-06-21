import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SpoolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const spool = await prisma.wireSpool.findUnique({
    where: { id: Number(params.id) },
    include: {
      wireType: true,
      usageLogs: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!spool) return notFound();

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">{spool.label}</h1>

      {/* Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-slate-400">Wire Type</div>
            <div className="text-lg font-semibold">{spool.wireType.name}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-400">Remaining</div>
            <div className="text-lg font-semibold">
              {spool.remainingFeet} ft
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          Total Length:{" "}
          <span className="text-slate-200">{spool.lengthFeet} ft</span>
        </div>

        {spool.location && (
          <div className="text-sm text-slate-400">
            Location: <span className="text-slate-200">{spool.location}</span>
          </div>
        )}

        {spool.remainingFeet <= spool.lowStockAt && (
          <div className="text-red-400 text-sm font-semibold">
            Low Stock (below {spool.lowStockAt} ft)
          </div>
        )}

        <div className="text-xs text-slate-500">
          Added: {spool.createdAt.toLocaleDateString()}
        </div>
      </div>

      {/* Usage Logs */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Usage Logs</h2>

        {spool.usageLogs.length === 0 && (
          <p className="text-slate-400">No usage logs yet.</p>
        )}

        <div className="space-y-3">
          {spool.usageLogs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-3"
            >
              <div className="flex justify-between">
                <div className="font-medium">{log.usedFeet} ft used</div>
                <div className="text-xs text-slate-500">
                  {log.createdAt.toLocaleDateString()}
                </div>
              </div>

              {log.jobName && (
                <div className="text-sm text-slate-400 mt-1">{log.jobName}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
