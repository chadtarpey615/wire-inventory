import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { spoolId, jobName, usedFeet } = body;

  const usage = await prisma.$transaction(async (tx) => {
    const log = await tx.usageLog.create({
      data: { spoolId, jobName, usedFeet },
    });

    await tx.wireSpool.update({
      where: { id: spoolId },
      data: {
        remainingFeet: {
          decrement: usedFeet,
        },
      },
    });

    return log;
  });

  return NextResponse.json(usage, { status: 201 });
}
