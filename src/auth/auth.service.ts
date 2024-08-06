import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { UserDocument } from "../user/schemas/user.schemas";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException(
                "Пользователь с таким email уже существует",
                HttpStatus.BAD_REQUEST
            );
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create({
            ...dto,
            password: hashPassword
        });
        return this.generateToken(user);
    }

    async generateToken(user: UserDocument) {
        return {
            token: this.jwtService.sign({
                email: user.email,
                id: user.id
            })
        };
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({
            message: "Неккоректный email или пароль"
        });
    }
}
