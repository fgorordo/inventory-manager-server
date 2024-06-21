import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetUser } from 'src/common/decorators';
import { RefreshTokenGuard, AccessTokenGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/login')
  localLogin(@Body() dto: AuthDto) {
    return this.authService.localLogin(dto);
  }

  @Post("/logout")
  @UseGuards(AccessTokenGuard)
  logout(@GetUser('sub') id: string) {
    return this.authService.logout(id);
  }

  @Post("/refresh")
  @UseGuards(RefreshTokenGuard)
  refreshAuthToken(
    @GetUser('sub') id: string,
    @GetUser('refreshToken') token: string
  ) {
    return this.authService.refreshAuthToken(id, token)
  }

  @Patch("/seed")
  createSeedUser() {
    return this.authService.createSeedUser();
  }
}
