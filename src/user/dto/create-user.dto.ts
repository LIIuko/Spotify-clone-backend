import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3, 20)
    readonly username: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
    readonly avatar?: string;
}
