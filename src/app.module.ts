import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/Auth.service';
import { AuthModule } from './Auth/Auth.module';
import { PipeModule } from './Pipes/Pipes.module';
import { ClassValidatorsModule } from './ClassValidators/ClassValidators.module';
import { MappedTypesModule } from './MappedTypes/MappedTypes.module';
import { CustomDecoratorModule } from './CustomDecorator/CustomDecorator.module';
import { testModule } from './Test/test.module';
import { redisModule } from './Redis/redis.module';


@Module({
  imports: [AuthModule,  PipeModule, ClassValidatorsModule, MappedTypesModule, CustomDecoratorModule, testModule, redisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
