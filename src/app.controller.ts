import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Headers,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  getProfile(@Request() req: Request, @Headers('authorization') token: string) {
    console.log(token);
    const user = this.authService.validateUserByToken(token);
    return user;
  }
}
