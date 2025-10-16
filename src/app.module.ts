import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/Auth.service';
import { AuthModule } from './Auth/Auth.module';
import { PipeModule } from './Pipes/Pipes.module';
import { ClassValidatorsModule } from './ClassValidators/ClassValidators.module';
import { MappedTypesModule } from './MappedTypes/MappedTypes.module';
import { CustomDecoratorModule } from './CustomDecorator/CustomDecorator.module';
import { testModule } from './test/test.module';


@Module({
  imports: [AuthModule,  PipeModule, ClassValidatorsModule, MappedTypesModule, testModule, CustomDecoratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
