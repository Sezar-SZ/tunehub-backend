import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import CONSTS from "./CONSTS";
import { RedisService } from "../redis/redis.service";
import { Song } from "./types/song";

@Injectable()
export class DeezerService {
    constructor(private redisService: RedisService) {}

    async searchSong(query: string) {
        const cachedResponse = await this.redisService.get(query);
        if (!cachedResponse) {
            const response = await fetch(CONSTS.searchUrl + query);
            if (response.ok) {
                const { data } = await response.json();
                this.redisService.set({
                    key: query,
                    value: JSON.stringify(data),
                });
                return data;
            }
            throw new ServiceUnavailableException();
        }

        return JSON.parse(cachedResponse);
    }

    async findById(externalID: string) {
        console.log("calling the deezer api...");

        const response = await fetch(CONSTS.findByIdUrl + externalID);
        if (response.ok) {
            const data = await response.json();
            return data as Song;
        }
        throw new ServiceUnavailableException();
    }
}
