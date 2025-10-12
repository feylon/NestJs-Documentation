import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe } from "@nestjs/common";
import { CustomPipe } from "./Custom.Pipe";

@Controller('pipe')
export class PipiController {

    // ParseIntPipe 
    @Get('ParseIntPipe/:id')
    GetById(@Param('id', ParseIntPipe) param: number) {
        console.log(param);
        return { param }
    }
    // ParseUUIDPipe Example : http://localhost:3000/pipe/ParseUUIDPipe/f81d4fae-7dec-11d0-a765-00a0c91e6bf6
    @Get("/ParseUUIDPipe/:uuid")
    GetByUUID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        console.log(uuid);
        return { uuid }
    }

    // Custom Pipe
    @Get("/custompipe/:id")
    CustomPipeFunction(@Param('id', CustomPipe) param: any) {
        console.log(param);
        return { param }

    }

}