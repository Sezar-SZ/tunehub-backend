import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaylistDto, UpdatePlaylistSchema } from "./dto/create";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlaylistsService {
    constructor(private prismaService: PrismaService) {}
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

    async update(userId: number, dto: UpdatePlaylistSchema) {
        const { id, ...data } = dto;
        const playlist = await this.prismaService.playlist.updateMany({
            where: {
                id: dto.id,
                creatorId: userId,
            },
            data,
        });
        return playlist;
    }

    async findAllByUser(userId: number) {
        const playlists = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: {
                Playlist: {
                    select: {
                        name: true,
                        id: true,
                        published: true,
                        playlistTrack: true,
                    },
                },
            },
        });
        return playlists;
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
}
