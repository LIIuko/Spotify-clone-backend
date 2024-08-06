import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as monoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schemas";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    title: string;
    @Prop()
    text: string;
    @Prop({ type: monoose.Schema.Types.ObjectId, ref: "User" })
    artist: User;
    @Prop()
    listens: number;
    @Prop()
    picture: string;
    @Prop()
    audio: string;
    @Prop({ type: [{ type: monoose.Schema.Types.ObjectId, ref: "Comment" }] })
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
