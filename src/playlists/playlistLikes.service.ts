import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlaylistLikesService {
    constructor(private prismaService: PrismaService) {}

    async addLike(userId: number, playlistId: string) {
        const isLiked = await this.prismaService.likePlaylist.findFirst({
            where: {
                playlistId,
                userId,
            },
        });
        if (isLiked)
            return {
                message: "playlist already liked by user",
            };

        const playlist = await this.prismaService.playlist.update({
            where: {
                id: playlistId,
            },
            data: {
                likePlaylist: {
                    create: {
                        userId,
                    },
                },
            },
        });

        return playlist;
    }

    async removeLike(userId: number, playlistId: string) {
        await this.prismaService.likePlaylist.deleteMany({
            where: {
                playlistId,
                userId,
            },
        });

        return { message: "deleted successfully" };
    }
}
