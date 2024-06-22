import { IsEmail, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @MinLength(1)
    full_name: string;

    @IsString()
    @IsEmail()
    email: string;
}
