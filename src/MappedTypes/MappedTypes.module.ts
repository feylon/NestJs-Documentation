import { Module } from "@nestjs/common";
import { MappedTypesController } from "./MappedTypes.controller";

@Module({
    controllers : [MappedTypesController]
})
export class MappedTypesModule {}