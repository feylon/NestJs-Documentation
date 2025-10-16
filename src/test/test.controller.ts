import { Controller, Post } from "@nestjs/common";
import { TestService } from "./Test.service";

@Controller('test')
export class testController {
    constructor(private testService: TestService) { }
    @Post()
    loginFunction() {
        this.testService.loginFunction();
    }
}