import { Module } from "@nestjs/common";
import { ClassValidatorsController } from "./ClassValidators.controller";

@Module({
    controllers : [ClassValidatorsController]
})
export class ClassValidatorsModule{}