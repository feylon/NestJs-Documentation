import { Body, Controller, Post, Put } from "@nestjs/common";
import { BODYDTO } from "./DTO";
import { UpdateUserDTO } from "./EditDTO";

@Controller('MappedTypes')
export class MappedTypesController{

    @Post()
    createUser(@Body() body : BODYDTO){
        console.log(body);
        return body;
    }

    @Put()
    UpdateUserDate(@Body() body : UpdateUserDTO){
        return body
    }
}