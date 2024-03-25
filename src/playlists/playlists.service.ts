import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create";
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

    async findOne(id: string) {
        try {
            const playlist =
                await this.prismaService.playlist.findUniqueOrThrow({
                    where: {
                        id,
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
