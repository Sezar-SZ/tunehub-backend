import { Test, TestingModule } from "@nestjs/testing";
import { SongsService } from "./songs.service";
import { DeezerService } from "../deezer/deezer.service";
import { RedisService } from "../redis/redis.service";
import { ConfigService } from "@nestjs/config";

describe("SongsService", () => {
    let service: SongsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SongsService,
                DeezerService,
                RedisService,
                ConfigService,
            ],
        }).compile();

        service = module.get<SongsService>(SongsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
