-- CreateTable
CREATE TABLE "WireType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "WireSpool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "lengthFeet" INTEGER NOT NULL,
    "remainingFeet" INTEGER NOT NULL,
    "location" TEXT,
    "lowStockAt" INTEGER NOT NULL DEFAULT 50,
    "wireTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WireSpool_wireTypeId_fkey" FOREIGN KEY ("wireTypeId") REFERENCES "WireType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UsageLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spoolId" INTEGER NOT NULL,
    "jobName" TEXT NOT NULL,
    "usedFeet" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UsageLog_spoolId_fkey" FOREIGN KEY ("spoolId") REFERENCES "WireSpool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WireType_name_key" ON "WireType"("name");
