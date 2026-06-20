import UsageForm from "@/components/inventory/usage-form";

export default function UsagePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Usage Log</h1>

      <UsageForm />

      <p className="text-slate-400 mt-6">
        Log wire usage here. This will automatically subtract from the selected
        spool.
      </p>
    </div>
  );
}
