import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  // Fetch summary data
  const baseUrl = process.env.SITE_URL;

  const [spoolsRes, typesRes] = await Promise.all([
    fetch(`${baseUrl}/api/spools`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/wire-types`, { cache: "no-store" }),
  ]);

  const spools = await spoolsRes.json();
  const types = await typesRes.json();

  const totalSpools = spools.length;
  const totalTypes = types.length;
  const lowStock = spools.filter((s: any) => s.remainingFeet <= s.lowStockAt);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Total Spools</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {totalSpools}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Wire Types</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{totalTypes}</CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-red-400">
            {lowStock.length}
          </CardContent>
        </Card>
      </div>

      {/* Low Stock List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Low Stock Spools</h2>

        {lowStock.length === 0 && (
          <p className="text-slate-500">No spools are low on wire.</p>
        )}

        <div className="space-y-3">
          {lowStock.map((spool: any) => (
            <Card
              key={spool.id}
              className="bg-slate-900 border-slate-800 p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{spool.label}</p>
                <p className="text-slate-400 text-sm">{spool.wireType?.name}</p>
              </div>

              <Badge variant="destructive">{spool.remainingFeet} ft left</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
