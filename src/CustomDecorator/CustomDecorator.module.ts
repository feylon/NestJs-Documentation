import { Module } from "@nestjs/common";
import { CustomDecoratorController } from "./CustomDecorator.controller";

@Module({
    controllers : [CustomDecoratorController]
})
export class CustomDecoratorModule{}