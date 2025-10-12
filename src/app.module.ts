import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/Auth.service';
import { AuthModule } from './Auth/Auth.module';
import { TestModule } from './test/test.module';
import { PipeModule } from './Pipes/Pipes.module';
import { ClassValidatorsModule } from './ClassValidators/ClassValidators.module';

@Module({
  imports: [AuthModule, TestModule, PipeModule, ClassValidatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
