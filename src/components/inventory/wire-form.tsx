"use client";

import { useState, useEffect } from "react";

export default function WireForm({ onCreated }: { onCreated?: () => void }) {
  const [label, setLabel] = useState("");
  const [lengthFeet, setLengthFeet] = useState(0);
  const [remainingFeet, setRemainingFeet] = useState(0);
  const [location, setLocation] = useState("");
  const [lowStockAt, setLowStockAt] = useState(25);
  const [wireTypeId, setWireTypeId] = useState<number | "">("");

  const [wireTypes, setWireTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load wire types
  useEffect(() => {
    async function loadTypes() {
      const res = await fetch("/api/wire-types");
      const data = await res.json();
      setWireTypes(data);
    }
    loadTypes();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/spools", {
      method: "POST",
      body: JSON.stringify({
        label,
        lengthFeet,
        remainingFeet,
        location,
        lowStockAt,
        wireTypeId,
      }),
    });

    setLoading(false);

    // Reset form
    setLabel("");
    setLengthFeet(0);
    setRemainingFeet(0);
    setLocation("");
    setLowStockAt(25);
    setWireTypeId("");

    onCreated?.();
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
          placeholder="Example: CAT6 Blue 1000ft"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Wire Type</label>
        <select
          required
          value={wireTypeId}
          onChange={(e) => {
            if (e.target.value === "new") {
              window.location.href = "/wire-types";
              return;
            }
            setWireTypeId(Number(e.target.value));
          }}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        >
          <option value="">Select wire type</option>

          {wireTypes.map((wt: any) => (
            <option key={wt.id} value={wt.id}>
              {wt.name}
            </option>
          ))}

          <option value="new">➕ Add new wire type</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Total Length (ft)</label>
        <input
          type="number"
          required
          value={lengthFeet}
          onChange={(e) => setLengthFeet(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Remaining (ft)</label>
        <input
          type="number"
          required
          value={remainingFeet}
          onChange={(e) => setRemainingFeet(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Van 1, Shop Shelf A, Jobsite, etc."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Low Stock At (ft)</label>
        <input
          type="number"
          required
          value={lowStockAt}
          onChange={(e) => setLowStockAt(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white"
      >
        {loading ? "Saving..." : "Add Spool"}
      </button>
    </form>
  );
}
