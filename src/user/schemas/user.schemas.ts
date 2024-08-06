import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as monoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Track } from "../../track/schemas/track.schemas";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    avatar: string;
    @Prop({ type: [{ type: monoose.Schema.Types.ObjectId, ref: "Track" }] })
    tracks: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);
