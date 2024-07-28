import { Controller, Get, Query } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Songs")
@Controller("songs")
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    search(@Query("q") q: string) {
        return this.songsService.search(q);
    }
}
