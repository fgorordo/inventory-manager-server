import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { Tokens, ValidRoles } from './models';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
        private jwtService: JwtService,

        private configService: ConfigService,
    ) {}

    async localLogin(dto: AuthDto): Promise<Tokens> {
        const candidate = await this.userRepository.findOneBy({email: dto.email});
        if (!candidate) throw new ForbiddenException("Credenciales incorrectas, intenta de nuevo por favor.");

        const hashMatches = this.compareHashes(dto.password, candidate.password)
        if (!hashMatches) throw new ForbiddenException("Credenciales incorrectas, intenta de nuevo por favor.");

        const tokens = await this.generateAccessAndRefreshToken(candidate.id, candidate.email)
        await this.updateUserRefreshTokenHash(candidate.id, tokens.refresh_token)

        return tokens;
    }

    async logout(id: string) {
        await this.userRepository.update({id, refresh_token_hash: Not(IsNull())}, {refresh_token_hash: null});
    }
    
    async refreshAuthToken(id: string, token: string) {
        const candidate = await this.userRepository.findOneBy({id});

        if (!candidate || !candidate.refresh_token_hash) throw new ForbiddenException("Acceso denegado, se requieren permisos");

        const tokenHashMatches = this.compareHashes(token, candidate.refresh_token_hash);
        if (!tokenHashMatches) throw new ForbiddenException("Acceso denegado, se requieren permisos");

        const tokens = await this.generateAccessAndRefreshToken(id, candidate.email);
        await this.updateUserRefreshTokenHash(candidate.id, tokens.refresh_token);

        return tokens;
    }

    async createSeedUser(): Promise<Tokens> {

        await this.userRepository.delete({});

        const candidate = this.userRepository.create({
            full_name: "Fern Developer",
            email: "dev@google.com",
            password: this.hashField("123456"),
            roles: [ValidRoles.USER, ValidRoles.SUPER_USER, ValidRoles.ADMIN]
        })

        const user = await this.userRepository.save(candidate);
        const tokens = await this.generateAccessAndRefreshToken(user.id, user.email);
        await this.updateUserRefreshTokenHash(user.id, tokens.refresh_token)

        return tokens;
    }

    private async generateAccessAndRefreshToken(sub: string, email: string): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({sub, email}, { expiresIn: 60 * 15, secret: this.configService.get('JWT_AT_SECRET')}),
            this.jwtService.signAsync({sub, email}, { expiresIn: 60 * 60 * 24 * 7, secret: this.configService.get('JWT_RT_SECRET')}),
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    private async updateUserRefreshTokenHash(id: string, token: string) {
        const hash = this.hashField(token)
        await this.userRepository.update({id}, {refresh_token_hash: hash});
    }

    private hashField(data: string) {
        const salt = bcrypt.genSaltSync()
        return bcrypt.hashSync(data, salt)
    }

    private compareHashes(candidate: string, hash: string) {
        return bcrypt.compareSync(candidate, hash);
    }
}
