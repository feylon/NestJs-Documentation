import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./Auth.controller";
import { AuthService } from "./Auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: 'Secret_KEY',
            signOptions: { expiresIn: '1h' }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    // exports: [AuthService],

})
export class AuthModule { }