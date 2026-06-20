"use client";

import { useEffect, useState } from "react";

type WireType = {
  id: number;
  name: string;
};

export default function SpoolForm({ onCreated }: { onCreated?: () => void }) {
  const [wireTypes, setWireTypes] = useState<WireType[]>([]);
  const [loading, setLoading] = useState(false);

  const [label, setLabel] = useState("");
  const [lengthFeet, setLengthFeet] = useState("");
  const [remainingFeet, setRemainingFeet] = useState("");
  const [location, setLocation] = useState("");
  const [lowStockAt, setLowStockAt] = useState("50");
  const [wireTypeId, setWireTypeId] = useState("");

  useEffect(() => {
    async function loadTypes() {
      const res = await fetch("/api/wire-types");
      const data = await res.json();
      setWireTypes(data);
    }
    loadTypes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/spools", {
      method: "POST",
      body: JSON.stringify({
        label,
        lengthFeet: Number(lengthFeet),
        remainingFeet: Number(remainingFeet),
        location,
        lowStockAt: Number(lowStockAt),
        wireTypeId: Number(wireTypeId),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setLabel("");
      setLengthFeet("");
      setRemainingFeet("");
      setLocation("");
      setLowStockAt("50");
      setWireTypeId("");
      onCreated?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-slate-900 border border-slate-800 rounded-lg"
    >
      <h2 className="text-lg font-semibold">Add Spool</h2>

      <div>
        <label className="block text-sm mb-1">Label</label>
        <input
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Spool #1, Blue CAT6, etc."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Wire Type</label>
        <select
          required
          value={wireTypeId}
          onChange={(e) => setWireTypeId(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        >
          <option value="">Select a wire type</option>
          {wireTypes.map((wt) => (
            <option key={wt.id} value={wt.id}>
              {wt.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Total Length (ft)</label>
        <input
          required
          type="number"
          value={lengthFeet}
          onChange={(e) => setLengthFeet(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Remaining (ft)</label>
        <input
          required
          type="number"
          value={remainingFeet}
          onChange={(e) => setRemainingFeet(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Location (optional)</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Van, Shop, Jobsite..."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Low Stock Alert (ft)</label>
        <input
          type="number"
          value={lowStockAt}
          onChange={(e) => setLowStockAt(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        {loading ? "Saving..." : "Add Spool"}
      </button>
    </form>
  );
}
