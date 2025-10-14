import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/Auth.service';
import { AuthModule } from './Auth/Auth.module';
import { PipeModule } from './Pipes/Pipes.module';
import { ClassValidatorsModule } from './ClassValidators/ClassValidators.module';
import { MappedTypesModule } from './MappedTypes/MappedTypes.module';
import { TestModule } from './test/test.module';
import { CustomDecoratorModule } from './CustomDecorator/CustomDecorator.module';

@Module({
  imports: [AuthModule,  PipeModule, ClassValidatorsModule, MappedTypesModule, TestModule, CustomDecoratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
