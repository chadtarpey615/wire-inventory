import WireTypeForm from "@/components/inventory/wire-type-form";

export default function WireTypesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Wire Types</h1>

      <WireTypeForm />

      <p className="text-slate-400 mt-6">
        Add wire types here. These will be selectable when creating spools.
      </p>
    </div>
  );
}
