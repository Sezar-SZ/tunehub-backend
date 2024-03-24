import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import { SongsModule } from './songs/songs.module';
import { DeezerService } from './deezer/deezer.service';
import Config from "./config/ConfigSchema";

@Module({
    imports: [
        UsersModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [Config],
        }),
        AuthModule,
        RedisModule,
        SongsModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, DeezerService],
})
export class AppModule {}
