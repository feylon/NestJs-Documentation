import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TestService {
    constructor(private jwtService: JwtService) { }
    async LoginFunction() {
        return {
            token: this.jwtService.sign({ data: 0 })
        }
    }
}