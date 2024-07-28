import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AccessTokenGuard } from "src/auth/guards/accessToken.guard";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AccessTokenGuard)
    @Get("likes")
    findLikes(@Req() req) {
        return this.userService.findLikes(req.user.sub);
    }
}
