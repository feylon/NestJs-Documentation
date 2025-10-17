import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { testService } from "./test.service";
import { MyDecorator } from "./MyDecorator";
import { AuthGuard } from "./AnyGuard";
import { JWTAuthGuard } from "src/Auth/jwt-auth.guard";

@Controller('test')
export class testController {
    constructor(private readonly testService : testService){}


    @Post()
    loginFunction(){
        return this.testService.loginFunction()
    }

    @UseGuards(JWTAuthGuard,AuthGuard)
    @MyDecorator('Superadmin1')
    @Get()
    GetProfileFunction(){
        return {
            Firstname : "Jamshid"
        }
    }
}