import { Test, TestingModule } from "@nestjs/testing";
import { DeezerService } from "./deezer.service";
import { RedisService } from "../redis/redis.service";
import { ServiceUnavailableException } from "@nestjs/common";

class RedisServiceMock {
    private cache = {};

    async get(key: string) {
        return this.cache[key];
    }

    async set({ key, value }: { key: string; value: string }) {
        this.cache[key] = value;
    }
}

describe("DeezerService", () => {
    let service: DeezerService;
    let redisService: RedisService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeezerService,
                { provide: RedisService, useClass: RedisServiceMock },
            ],
        }).compile();

        service = module.get<DeezerService>(DeezerService);
        redisService = module.get<RedisService>(RedisService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("searchSong", () => {
        it("should return cached response if available", async () => {
            const cachedResponse = { title: "Cached Song" };
            jest.spyOn(redisService, "get").mockResolvedValue(
                JSON.stringify(cachedResponse)
            );

            const result = await service.searchSong("query");

            expect(result).toEqual(cachedResponse);
        });

        it("should fetch data if not available in cache", async () => {
            const fetchedData = { title: "Fetched Song" };
            jest.spyOn(redisService, "get").mockResolvedValue(null);
            jest.spyOn(global, "fetch").mockResolvedValue(
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: fetchedData }),
                }) as unknown as Response
            );

            const result = await service.searchSong("query");

            expect(result).toEqual(fetchedData);
        });

        it("should throw ServiceUnavailableException if fetch fails", async () => {
            jest.spyOn(redisService, "get").mockResolvedValue(null);
            jest.spyOn(global, "fetch").mockResolvedValue({
                ok: false,
            } as unknown as Response);

            await expect(service.searchSong("query")).rejects.toThrowError(
                ServiceUnavailableException
            );
        });
    });
});
