import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport"
import {ExtractJwt, Strategy} from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), // Header Tokenni oladi
             secretOrKey : 'Secret_KEY'
        })
    }

    async validate(...args: any[]) {
        return {
            userid : args
        }
    }
}