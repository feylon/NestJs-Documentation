import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class TestService {
    testFunction(){
      
        return {
            data : 0
        }
    }
}