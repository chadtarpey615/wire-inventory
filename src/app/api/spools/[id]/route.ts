import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: any) {
  const spool = await prisma.wireSpool.findUnique({
    where: { id: Number(params.id) },
    include: { wireType: true },
  });

  return NextResponse.json(spool);
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  const updated = await prisma.wireSpool.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.wireSpool.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true });
}
