import { Module } from "@nestjs/common";
import { TracksService } from "./tracks.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { SongsModule } from "src/songs/songs.module";

@Module({
    providers: [TracksService],
    imports: [PrismaModule, SongsModule],
    exports: [TracksService],
})
export class TracksModule {}
