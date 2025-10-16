import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TestService } from "./Test.service";
import { jwtstrategy } from "./jwt.strategy";

@Module({
    imports : [JwtModule.register({}), PassportModule],
    providers : [jwtstrategy,TestService]
})
export class testModule {}