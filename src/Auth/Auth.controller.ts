import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { loginDTO } from "./Auth.DTO";
import { JWTAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) { }
    @Post('login')
    loginFunction(@Body() body: loginDTO) {
        return this.AuthService.LoginFunction(body);
    }


    @UseGuards(JWTAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user; // validate() funksiyasidan kelgan foydalanuvchi ma’lumotlari
    }

}   