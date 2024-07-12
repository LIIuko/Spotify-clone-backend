import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schemas";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
        JwtModule.register({
            secret:process.env.PRIVATE_KEY || "SECRET",
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule{

}