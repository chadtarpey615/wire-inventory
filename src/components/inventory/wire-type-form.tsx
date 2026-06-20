"use client";

import { useState } from "react";

export default function WireTypeForm({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/wire-types", {
      method: "POST",
      body: JSON.stringify({ name, color, notes }),
    });

    setLoading(false);

    if (res.ok) {
      setName("");
      setColor("");
      setNotes("");
      onCreated?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-slate-900 border border-slate-800 rounded-lg"
    >
      <h2 className="text-lg font-semibold">Add Wire Type</h2>

      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="CAT6, RG6, Fiber, etc."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Color (optional)</label>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Blue, White, Yellow..."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Any details about this wire type..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-white"
      >
        {loading ? "Saving..." : "Add Wire Type"}
      </button>
    </form>
  );
}
