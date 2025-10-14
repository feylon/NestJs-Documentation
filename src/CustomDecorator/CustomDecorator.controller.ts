import { Controller, Get, UseGuards } from "@nestjs/common";
import { CustomDecorator } from "./CustomDecorator";
import { RolesGuard } from "./Guard";

@Controller('CustomDecorator')
export class CustomDecoratorController {

    @UseGuards(RolesGuard)
    @CustomDecorator(['Superadmin'])
    @Get()
    GetFunction() {
        return {
            message: "OK"
        }
    }
}