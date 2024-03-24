import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import CONSTS from "./CONSTS";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class DeezerService {
    constructor(private redisService: RedisService) {}

    async searchSong(query: string) {
        const cachedResponse = await this.redisService.get(query);
        if (!cachedResponse) {
            const response = await fetch(CONSTS.url + query);
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
}
