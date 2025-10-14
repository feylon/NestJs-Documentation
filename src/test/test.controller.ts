import { Controller, Get, UseGuards } from "@nestjs/common";
import { MyDecorator } from "./CustomDecorator";
import { AuthGuard } from "./MyGuard";


@UseGuards(AuthGuard)
@Controller('test')
export class testController{
    @Get()
    @MyDecorator(['Superadmin'])
    getFunction(){
        return {
            Status : "201"
        }
    }
}