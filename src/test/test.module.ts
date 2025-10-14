import { Module } from "@nestjs/common";
import { testController } from "./test.controller";

@Module({
    controllers : [testController]
})
export class TestModule {

}