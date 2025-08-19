/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'PLACEHOLDER';

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
