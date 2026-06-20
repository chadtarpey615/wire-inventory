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

export default function WireTable() {
  const [types, setTypes] = useState([]);

  async function load() {
    const res = await fetch("/api/wire-types");
    const data = await res.json();
    setTypes(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteType(id: number) {
    await fetch(`/api/wire-types/${id}`, { method: "DELETE" });
    load(); // refresh table
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-md p-4">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800">
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {types.map((t: any) => (
            <TableRow key={t.id} className="border-slate-800">
              <TableCell className="font-medium">{t.name}</TableCell>

              <TableCell>
                {t.color ? (
                  <Badge
                    style={{ backgroundColor: t.color }}
                    className="text-black"
                  >
                    {t.color}
                  </Badge>
                ) : (
                  <span className="text-slate-500">None</span>
                )}
              </TableCell>

              <TableCell>
                {t.notes || <span className="text-slate-500">—</span>}
              </TableCell>

              <TableCell className="flex gap-2">
                <a
                  href={`/wire-types/${t.id}/edit`}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                >
                  Edit
                </a>

                <button
                  onClick={() => deleteType(t.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
