import SpoolForm from "@/components/inventory/spool-form";
import SpoolTable from "@/components/inventory/spool-table";
console.log("site_url", process.env.SITE_URL);
export default function SpoolsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Spools</h1>

      <SpoolForm />

      <div>
        <h2 className="text-xl font-semibold mb-3">Inventory</h2>
        <SpoolTable />
      </div>
    </div>
  );
}
