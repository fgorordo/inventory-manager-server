import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
