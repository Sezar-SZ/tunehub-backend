/*
  Warnings:

  - You are about to drop the `PlaylistTrach` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[externalID]` on the table `Song` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalID` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlaylistTrach" DROP CONSTRAINT "PlaylistTrach_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistTrach" DROP CONSTRAINT "PlaylistTrach_songId_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "externalID" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlaylistTrach";

-- CreateTable
CREATE TABLE "PlaylistTrack" (
    "id" SERIAL NOT NULL,
    "playlistId" VARCHAR(11) NOT NULL,
    "songId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_externalID_key" ON "Song"("externalID");

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
