import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; firstName: string; lastName: string; company: string },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('validate-token')
  async validateToken(@Body() body: { token: string }) {
    try {
      const decoded = this.authService.verifyToken(body.token);
      return { valid: true, user: decoded };
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }
}
