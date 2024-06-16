/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `activityStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activityStatus_userId_key" ON "activityStatus"("userId");
