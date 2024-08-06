import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'


@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        ConfigModule.forRoot(),
        TrackModule,
        AuthModule,
        UserModule,
        FileModule,
        MongooseModule.forRoot(process.env.DB)
    ]
})
export class AppModule {
}
