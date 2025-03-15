/*
  Warnings:

  - You are about to drop the column `age` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `rolesId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[docNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthday` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docNumber` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docType` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_rolesId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "age",
DROP COLUMN "rolesId",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "docNumber" TEXT NOT NULL,
ADD COLUMN     "docType" TEXT NOT NULL,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_docNumber_key" ON "Users"("docNumber");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
