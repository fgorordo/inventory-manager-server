import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRoles } from "../models";


export class CreateUserDto {
    @IsString()
    @MinLength(1)
    full_name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: UserRoles;
}
