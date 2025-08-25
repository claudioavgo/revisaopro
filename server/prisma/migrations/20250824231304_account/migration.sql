/*
  Warnings:

  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,provider]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_accountId_fkey";

-- DropIndex
DROP INDEX "public"."User_accountId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "accountId";

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_provider_key" ON "public"."Account"("userId", "provider");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
