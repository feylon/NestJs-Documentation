import { Injectable } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Injectable()
export class TestService {
    constructor(private jwtService : JwtService){}

    loginFunction(){
        return {
            accessToken : this.jwtService.sign({
                id : "1",
                role : "Admin"
            })
        }
    }
}