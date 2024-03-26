import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    UseGuards,
    Req,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { ZodValidationPipe } from "src/validators/zod.validator";
import { PlaylistsService } from "./playlists.service";
import { CreatePlaylistDto, createPlaylistSchema } from "./dto/create";
import { AccessTokenGuard } from "src/auth/guards/accessToken.guard";

@Controller("playlists")
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) {}

    @Post()
    @UseGuards(AccessTokenGuard)
    @UsePipes(new ZodValidationPipe(createPlaylistSchema))
    async create(@Req() req, @Body() dto: CreatePlaylistDto) {
        return await this.playlistsService.create(req.user.sub, dto);
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    async findAllByUser(@Req() req) {
        return await this.playlistsService.findAllByUser(req.user.sub);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.playlistsService.findOne(id);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Post(":playlistId/track/:songExternalId")
    addSong(
        @Req() req,
        @Param("playlistId") playlistId: string,
        @Param("songExternalId") songExternalId: string
    ) {
        return this.playlistsService.addSong(
            req.user.sub,
            playlistId,
            songExternalId
        );
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    @Delete(":playlistId/track/:playlistTrackId")
    removeSong(
        @Req() req,
        @Param("playlistId") playlistId: string,
        @Param("playlistTrackId") playlistTrackId: number
    ) {
        return this.playlistsService.removeSong(
            req.user.sub,
            playlistId,
            playlistTrackId
        );
    }

    @UseGuards(AccessTokenGuard)
    @Delete(":id")
    remove(@Req() req, @Param("id") id: string) {
        return this.playlistsService.remove(req.user.sub, id);
    }
}
