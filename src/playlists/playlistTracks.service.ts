import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SongsService } from "src/songs/songs.service";

@Injectable()
export class PlaylistTracksService {
    constructor(
        private prismaService: PrismaService,
        private songService: SongsService
    ) {}

    async addSong(userId: number, playlistId: string, songExternalId: string) {
        const song = await this.songService.create(songExternalId);
        const playlist = await this.prismaService.playlist.findUnique({
            where: {
                id: playlistId,
                creatorId: userId,
            },
        });

        if (!playlist) {
            throw new Error("Playlist not found");
        }

        await this.prismaService.playlist.update({
            where: {
                id: playlistId,
                creatorId: userId,
            },
            data: {
                playlistTrack: {
                    create: {
                        song: {
                            connect: {
                                id: song.id,
                            },
                        },
                    },
                },
            },
        });

        return song;
    }

    async removeSong(
        userId: number,
        playlistId: string,
        playlistTrackId: number
    ) {
        const playlist = await this.prismaService.playlist.update({
            where: {
                id: playlistId,
                creatorId: userId,
            },
            data: {
                playlistTrack: {
                    delete: {
                        id: +playlistTrackId,
                    },
                },
            },
        });
        return playlist;
    }
}
