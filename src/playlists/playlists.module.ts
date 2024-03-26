import { Module } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { PlaylistsController } from "./playlists.controller";
import { SongsModule } from "src/songs/songs.module";

@Module({
    imports: [SongsModule],
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
})
export class PlaylistsModule {}
