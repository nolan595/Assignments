/*
  Warnings:

  - Changed the type of `color` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CarColor" AS ENUM ('RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE');

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "color",
ADD COLUMN     "color" "CarColor" NOT NULL;
