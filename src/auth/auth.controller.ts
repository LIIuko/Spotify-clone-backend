import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller("/auth")
export class AuthController {


    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: CreateUserDto) {
      return this.authService.login(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    registration(@Body() dto: CreateUserDto) {
      return this.authService.registration(dto);
    }

}