import { Controller, Get, Query } from "@nestjs/common";
import { PaginationDTO } from "./DTO";

@Controller('ClassValidators')
export class ClassValidatorsController {
    @Get('/data')
    GetDataFunction(@Query() query : PaginationDTO){
        return {query}
    }
}