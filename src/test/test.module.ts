import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStretegy } from "./JwtSrategy";
import { testController } from "./test.controller";
import { testService } from "./test.service";

@Module({
    imports: [
        JwtModule.register({})
    ],
    controllers: [testController],
    providers: [JwtStretegy, testService]
})
export class testModule { }