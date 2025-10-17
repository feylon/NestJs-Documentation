import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStretegy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: "Mysecret",
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    validate(...args: any[]): unknown {
        return args[0]
    }
}