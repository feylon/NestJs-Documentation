import { Controller, Post } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller("test")
export class TestController {
    constructor(private TestService : TestService){}
    @Post()
    loginFunction(){
        return this.TestService.LoginFunction()
    }

}