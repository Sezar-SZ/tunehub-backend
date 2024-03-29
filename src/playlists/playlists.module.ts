import { Module } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { PlaylistsController } from "./playlists.controller";
import { SongsModule } from "src/songs/songs.module";
import { PlaylistTracksService } from "./playlistTracks.service";
import { PlaylistLikesService } from "./playlistLikes.service";

@Module({
    imports: [SongsModule],
    controllers: [PlaylistsController],
    providers: [PlaylistsService, PlaylistTracksService, PlaylistLikesService],
})
export class PlaylistsModule {}
