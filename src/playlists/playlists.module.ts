import { Module } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { PlaylistsController } from "./playlists.controller";
import { SongsModule } from "src/songs/songs.module";
import { TracksModule } from "src/tracks/tracks.module";

@Module({
    imports: [SongsModule, TracksModule],
    controllers: [PlaylistsController],
    providers: [PlaylistsService],
})
export class PlaylistsModule {}
