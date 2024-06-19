import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { ValidRoles } from './models';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    localLogin(dto: AuthDto) {}

    logout() {}
    
    refreshAuthToken() {}

    async createSeedUser() {

        await this.userRepository.delete({});

        const seedUser = this.userRepository.create({
            full_name: "Fern Developer",
            email: "dev@google.com",
            password: this.hashField("123456"),
            roles: [ValidRoles.USER, ValidRoles.SUPER_USER, ValidRoles.ADMIN]
        })

        return await this.userRepository.save(seedUser);
    }

    private hashField(data: string) {
        const salt = bcrypt.genSaltSync()
        return bcrypt.hashSync(data, salt)
    }

    private compareHashes(candidate: string, hash: string) {
        return bcrypt.compareSync(candidate, hash);
    }
}
