import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironment } from './helpers';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: +configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: configService.get("NODE_ENVIRONMENT") === "development" ? true : false
      }),
      inject: [ConfigService]
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
