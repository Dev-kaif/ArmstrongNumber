/*
  Warnings:

  - A unique constraint covering the columns `[number,userId]` on the table `ArmstrongNumber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArmstrongNumber_number_userId_key" ON "ArmstrongNumber"("number", "userId");
