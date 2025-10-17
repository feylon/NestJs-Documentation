import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class testService {
    constructor(private readonly jwtservice: JwtService) { }


    async loginFunction() {
        return {
            accessToken: this.jwtservice.sign({ id: "1", role: "Superadmin" }, { expiresIn: "1d", secret: "Mysecret" })
        }
    }
}