/*
  Warnings:

  - You are about to drop the `_LikedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikedProducts" DROP CONSTRAINT "_LikedProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedProducts" DROP CONSTRAINT "_LikedProducts_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "likedById" TEXT[];

-- DropTable
DROP TABLE "_LikedProducts";
