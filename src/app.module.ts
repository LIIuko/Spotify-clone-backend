import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		TrackModule,
		MongooseModule.forRoot('mongodb+srv://admin:wwwwww@cluster0.5y7futl.mongodb.net/spotify-clone?retryWrites=true&w=majority&appName=Cluster0'),
	]
})
export class AppModule { }
