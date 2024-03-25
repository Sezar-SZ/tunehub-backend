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

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.playlistsService.findOne(id);
    }

    @UseGuards(AccessTokenGuard)
    @Delete(":id")
    remove(@Req() req, @Param("id") id: string) {
        return this.playlistsService.remove(req.user.sub, id);
    }
}
