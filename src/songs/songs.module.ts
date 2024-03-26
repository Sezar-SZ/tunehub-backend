import { Module } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { SongsController } from "./songs.controller";
import { DeezerService } from "src/deezer/deezer.service";

@Module({
    controllers: [SongsController],
    providers: [SongsService, DeezerService],
    exports: [SongsService],
})
export class SongsModule {}
