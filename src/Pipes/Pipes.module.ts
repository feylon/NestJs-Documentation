import { Module } from "@nestjs/common";
import { PipiController } from "./Pipes.controller";

@Module({
    controllers : [PipiController]
})
export class PipeModule { }