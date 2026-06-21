-- CreateTable
CREATE TABLE "WireType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "notes" TEXT,

    CONSTRAINT "WireType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WireSpool" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "lengthFeet" INTEGER NOT NULL,
    "remainingFeet" INTEGER NOT NULL,
    "location" TEXT,
    "lowStockAt" INTEGER NOT NULL DEFAULT 50,
    "wireTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WireSpool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageLog" (
    "id" SERIAL NOT NULL,
    "spoolId" INTEGER NOT NULL,
    "jobName" TEXT NOT NULL,
    "usedFeet" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WireType_name_key" ON "WireType"("name");

-- AddForeignKey
ALTER TABLE "WireSpool" ADD CONSTRAINT "WireSpool_wireTypeId_fkey" FOREIGN KEY ("wireTypeId") REFERENCES "WireType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageLog" ADD CONSTRAINT "UsageLog_spoolId_fkey" FOREIGN KEY ("spoolId") REFERENCES "WireSpool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
