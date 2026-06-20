"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SpoolTable() {
  const [spools, setSpools] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/spools");
      const data = await res.json();
      setSpools(data);
    }
    load();
  }, []);

  const filtered = spools.filter((s: any) => {
    const matchesSearch =
      s.label.toLowerCase().includes(search.toLowerCase()) ||
      s.wireType?.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.location || "").toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType ? s.wireType?.name === filterType : true;
    const matchesLocation = filterLocation
      ? s.location === filterLocation
      : true;

    return matchesSearch && matchesType && matchesLocation;
  });

  const wireTypes = [...new Set(spools.map((s: any) => s.wireType?.name))];
  const locations = [...new Set(spools.map((s: any) => s.location))];

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search spools..."
          className="px-3 py-2 rounded bg-slate-900 border border-slate-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded bg-slate-900 border border-slate-800"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          {wireTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 rounded bg-slate-900 border border-slate-800"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l}>{l || "N/A"}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Table className="bg-slate-900 border border-slate-800 rounded-md">
        <TableHeader>
          <TableRow className="border-slate-800">
            <TableHead>Label</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((spool: any) => {
            const low = spool.remainingFeet <= spool.lowStockAt;

            return (
              <TableRow
                key={spool.id}
                className="cursor-pointer hover:bg-slate-800/50"
              >
                <TableCell>
                  <Link
                    href={`/spools/${spool.id}`}
                    className="hover:underline"
                  >
                    {spool.label}
                  </Link>
                </TableCell>

                <TableCell>{spool.wireType?.name}</TableCell>

                <TableCell>{spool.remainingFeet} ft</TableCell>

                <TableCell>{spool.location || "N/A"}</TableCell>

                <TableCell>
                  {low ? (
                    <Badge variant="destructive">Low</Badge>
                  ) : (
                    <Badge variant="secondary">OK</Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
