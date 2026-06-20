"use client";

import { useEffect, useState } from "react";

type Spool = {
  id: number;
  label: string;
  remainingFeet: number;
  wireType: {
    name: string;
  };
};

export default function UsageForm({ onLogged }: { onLogged?: () => void }) {
  const [spools, setSpools] = useState<Spool[]>([]);
  const [spoolId, setSpoolId] = useState("");
  const [jobName, setJobName] = useState("");
  const [usedFeet, setUsedFeet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSpools() {
      const res = await fetch("/api/spools");
      const data = await res.json();
      setSpools(data);
    }
    loadSpools();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/usage", {
      method: "POST",
      body: JSON.stringify({
        spoolId: Number(spoolId),
        jobName,
        usedFeet: Number(usedFeet),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSpoolId("");
      setJobName("");
      setUsedFeet("");
      onLogged?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-slate-900 border border-slate-800 rounded-lg"
    >
      <h2 className="text-lg font-semibold">Log Wire Usage</h2>

      <div>
        <label className="block text-sm mb-1">Spool</label>
        <select
          required
          value={spoolId}
          onChange={(e) => setSpoolId(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
        >
          <option value="">Select a spool</option>
          {spools.map((spool) => (
            <option key={spool.id} value={spool.id}>
              {spool.label} — {spool.wireType?.name} ({spool.remainingFeet} ft
              left)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Job Name</label>
        <input
          required
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="Customer name, job site, etc."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Feet Used</label>
        <input
          required
          type="number"
          value={usedFeet}
          onChange={(e) => setUsedFeet(e.target.value)}
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
          placeholder="50"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
      >
        {loading ? "Logging..." : "Log Usage"}
      </button>
    </form>
  );
}
