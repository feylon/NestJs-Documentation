import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ignoreElements } from "rxjs";

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy){
    constructor(){super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration : false,
        secretOrKey : "Mysecret"
        
    })}
   
    validate(...args: any[]): unknown {
        return {args : args}
    }

}