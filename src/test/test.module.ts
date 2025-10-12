import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt"
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
   imports : [
    JwtModule.register({
        global : true,
        secret : "MySecret",
        signOptions : {
            expiresIn : '1h'
        }
    })
   ],
   controllers : [TestController],
   providers : [TestService]
})
export class TestModule{}