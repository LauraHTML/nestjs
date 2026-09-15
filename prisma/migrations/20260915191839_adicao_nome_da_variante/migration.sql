/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Variants" ADD COLUMN     "name" TEXT NOT NULL;
