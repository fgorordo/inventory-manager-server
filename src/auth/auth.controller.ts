import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/login')
  localLogin(@Body() dto: AuthDto) {
    return this.authService.localLogin(dto);
  }

  @Post("/logout")
  logout() {
    return this.authService.logout()
  }

  @Post("/refresh")
  refreshAuthToken() {
    return this.authService.refreshAuthToken()
  }

  @Patch("/seed")
  createSeedUser() {
    return this.authService.createSeedUser();
  }
}
