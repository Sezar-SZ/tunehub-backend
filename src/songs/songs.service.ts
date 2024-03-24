import { Injectable } from "@nestjs/common";
import { DeezerService } from "../deezer/deezer.service";

@Injectable()
export class SongsService {
    constructor(private deezerService: DeezerService) {}

    async search(query: string) {
        return this.deezerService.searchSong(query);
    }
}
