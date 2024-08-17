import { BadRequestException, Injectable } from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto";
import { RedisService } from "src/redis/redis.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
        private config: ConfigService
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: createUserDto.email,
                    },
                    { username: createUserDto.username },
                ],
            },
        });
        if (user)
            throw new BadRequestException("Bad Request", {
                description:
                    "Account with this Email or Username already exists",
            });

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                username: createUserDto.username,
                password: hashedPassword,
            },
        });
    }

    async findOne(email: string) {
        return await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    async findById(id: number) {
        return await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
    }

    async addRefreshToken(userId: number, refreshToken: string) {
        await this.redis.set({
            key: `user${userId}:${refreshToken}`,
            value: 1,
            time:
                parseInt(
                    this.config.get("REFRESH_EXPIRATION").slice(0, -1),
                    10
                ) *
                (24 * 60 * 60),
        });
    }

    async removeRefreshToken(userId: number, refreshToken: string) {
        await this.redis.del(`user${userId}:${refreshToken}`);
    }

    async findLikes(userId: number) {
        return await this.prisma.likePlaylist.findMany({
            where: {
                userId,
            },
            include: {
                playlist: true,
            },
        });
    }
}
