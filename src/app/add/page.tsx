import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AddSpoolPage() {
  const wireTypes = await prisma.wireType.findMany({
    orderBy: { name: "asc" },
  });

  async function createSpool(formData: FormData) {
    "use server";

    const label = formData.get("label") as string;
    const lengthFeet = Number(formData.get("lengthFeet"));
    const remainingFeet = Number(formData.get("remainingFeet"));
    const location = formData.get("location") as string;
    const lowStockAt = Number(formData.get("lowStockAt"));
    const wireTypeId = Number(formData.get("wireTypeId"));

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
          <input
            name="label"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
            placeholder="14/2 White"
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

        {/* Wire Type Dropdown */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Wire Type</label>
          <select
            name="wireTypeId"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2"
          >
            <option value="">Select type</option>
            {wireTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
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
