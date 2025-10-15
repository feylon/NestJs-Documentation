import { Controller, Get, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./Guard";

export const MyDecorator = (roles: string[]) => {
    return SetMetadata("roles", roles)
}

@UseGuards(AuthGuard)
@Controller('test')
export class testController {
    constructor() { }

    // @MyDecorator('salom')
    @MyDecorator(['Xatolik'])
    @Get()
    getFunction() {
        return {
            status: "OK"
        }
    }
}