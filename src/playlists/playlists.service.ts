import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create";
import { PrismaService } from "src/prisma/prisma.service";
import { SongsService } from "src/songs/songs.service";

@Injectable()
export class PlaylistsService {
    constructor(
        private prismaService: PrismaService,
        private songService: SongsService
    ) {}
    async create(userId: number, dto: CreatePlaylistDto) {
        const playlist = await this.prismaService.playlist.create({
            data: {
                name: dto.name,
                published: dto.published,
                creatorId: userId,
            },
        });
        return playlist;
    }

    async findOne(id: string) {
        try {
            const playlist =
                await this.prismaService.playlist.findUniqueOrThrow({
                    where: {
                        id,
                    },
                    include: {
                        playlistTrack: { select: { id: true, song: true } },
                    },
                });

            return playlist;
        } catch (error) {
            throw new NotFoundException("Playlist not found");
        }
    }

    async remove(userId: number, playListId: string) {
        const playlist = await this.prismaService.playlist.delete({
            where: {
                id: playListId,
                creatorId: userId,
            },
        });
        return playlist;
    }

    async addSong(userId: number, playlistId: string, songExternalId: string) {
        const song = await this.songService.create(songExternalId);
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
