import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const spools = await prisma.wireSpool.findMany({
    include: { wireType: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(spools);
}

export async function POST(req: Request) {
  const body = await req.json();
  const spool = await prisma.wireSpool.create({
    data: body,
  });

  return NextResponse.json(spool, { status: 201 });
}
