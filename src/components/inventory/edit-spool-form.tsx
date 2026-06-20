"use client";

import { useState, useEffect } from "react";

export default function EditSpoolForm({ spool }: any) {
  const [wireTypes, setWireTypes] = useState([]);

  const [label, setLabel] = useState(spool.label);
  const [lengthFeet, setLengthFeet] = useState(spool.lengthFeet);
  const [remainingFeet, setRemainingFeet] = useState(spool.remainingFeet);
  const [location, setLocation] = useState(spool.location || "");
  const [lowStockAt, setLowStockAt] = useState(spool.lowStockAt);
  const [wireTypeId, setWireTypeId] = useState(spool.wireTypeId);

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

    await fetch(`/api/spools/${spool.id}`, {
      method: "PUT",
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

    // Redirect back to spool detail page
    window.location.href = `/spools/${spool.id}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-slate-900 border border-slate-800 rounded-lg"
    >
      <div>
        <label className="block text-sm mb-1">Label</label>
        <input
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
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
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
