import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const types = await prisma.wireType.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(types);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, color, notes } = body;

  const type = await prisma.wireType.create({
    data: { name, color, notes },
  });

  return NextResponse.json(type, { status: 201 });
}
