import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = { id: 1, email: body.email, role: 'admin' }; // misol uchun
    return this.authService.login(user);
  }
}
