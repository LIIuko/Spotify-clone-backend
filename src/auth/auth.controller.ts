import {
    Body,
    Controller, Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    Request, UseInterceptors, UploadedFile
} from "@nestjs/common";
import { AuthGuard } from './auth.guard';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { Public } from "./public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('avatar'))
    @Post("register")
    registration(@Body() dto: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
        return this.authService.registration(dto, avatar);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
