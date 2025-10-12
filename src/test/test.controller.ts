import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from "@nestjs/common";
import { TestService } from "./test.service";
import { AllowAnonyms } from "./decorators";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "./Guard";

@UseGuards(AuthGuard)
@Controller('test')
export class TestController {
    constructor(private readonly TestService : TestService,
        private readonly reflector : Reflector
    ){}


    @AllowAnonyms()
    @Get()
    getTestFunction(@Req() req){
        const isPublic =  this.reflector.get('isPublic', TestController);
    //    console.log(req);
        return this.TestService.testFunction();
    }


    // Custom Pipes


    @Get('pipe/:id')
    getPipeTest(@Param('id' ,  ParseIntPipe) param : number)
    {
        return {param}
    }
}