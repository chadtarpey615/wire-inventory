import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AddSpoolPage() {
  const wireTypes = await prisma.wireType.findMany({
    orderBy: { name: "asc" },
  });

  // Create a lookup: { "cat6": 1, "rg6": 2, ... }
  const wireTypeMap = Object.fromEntries(
    wireTypes.map((t) => [t.name.toLowerCase(), t.id]),
  );

  async function createSpool(formData: FormData) {
    "use server";

    // Get dropdown label
    let label = (formData.get("label") as string)?.trim();

    // Get custom label
    const customLabel = (formData.get("customLabel") as string)?.trim();

    // If custom label is provided, override dropdown
    if (customLabel) {
      label = customLabel;
    }

    const normalized = label.toLowerCase();

    const lengthFeet = Number(formData.get("lengthFeet"));
    const remainingFeet = Number(formData.get("remainingFeet"));
    const location = formData.get("location") as string;
    const lowStockAt = Number(formData.get("lowStockAt"));

    // Auto‑match wire type
    let wireTypeId = wireTypeMap[normalized];

    // If no match, auto‑create a new wire type
    if (!wireTypeId) {
      const newType = await prisma.wireType.create({
        data: { name: label },
      });
      wireTypeId = newType.id;
    }

    await prisma.wireSpool.create({
      data: {
        label,
        lengthFeet,
        remainingFeet,
        location: location || null,
        lowStockAt,
        wireTypeId,
      },
    });

    redirect("/inventory");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Spool</h1>

      <form action={createSpool} className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Label</label>

          <select
            name="label"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 mb-2"
            defaultValue=""
          >
            <option value="">Select preset</option>
            <option value="CAT6">CAT6</option>
            <option value="CAT6A">CAT6A</option>
            <option value="RG6">RG6</option>
            <option value="18-2">18-2</option>
            <option value="18-4">18-4</option>
            <option value="16-2">16-2</option>
            <option value="16-4">16-4</option>
            <option value="22-2">22-2</option>
            <option value="22-4">22-4</option>
            <option value="Romex">Romex</option>
            <option value='1" Conduit'>1" Conduit</option>
            <option value='1.5" Conduit'>1.5" Conduit</option>
          </select>

          <input
            name="customLabel"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
            placeholder="Or type custom label"
          />
        </div>

        {/* Length Feet */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Total Length (ft)
          </label>
          <input
            name="lengthFeet"
            type="number"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
            placeholder="250"
          />
        </div>

        {/* Remaining Feet */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Remaining Feet
          </label>
          <input
            name="remainingFeet"
            type="number"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
            placeholder="250"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Location</label>
          <input
            name="location"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
            placeholder="Van, Shop, Jobsite"
          />
        </div>

        {/* Low Stock Threshold */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Low Stock Warning (ft)
          </label>
          <input
            name="lowStockAt"
            type="number"
            defaultValue={50}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
        >
          Add Spool
        </button>
      </form>
    </div>
  );
}
