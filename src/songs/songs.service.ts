import { Injectable } from "@nestjs/common";
import { DeezerService } from "../deezer/deezer.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SongsService {
    constructor(
        private deezerService: DeezerService,
        private prismaService: PrismaService
    ) {}

    async search(query: string) {
        return this.deezerService.searchSong(query);
    }

    async create(externalID: string) {
        const song = await this.prismaService.song.findUnique({
            where: { externalID },
        });
        if (song) return song;

        const data = await this.deezerService.findById(externalID);
        const newSong = this.prismaService.song.create({
            data: {
                externalID: data.id.toString(),
                title: data.title,
                artist: data.artist?.name,
                cover: data.album?.cover || data.artist?.picture,
                preview: data.preview,
            },
        });

        return newSong;
    }
}
