import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Track } from "./track.schemas";
import * as monoose from 'mongoose';
import { User } from "../../auth/schemas/user.schemas";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    text: string;
    @Prop({type: [{type: monoose.Schema.Types.ObjectId, ref: 'User'}]})
    username: User;
    @Prop({type: [{type: monoose.Schema.Types.ObjectId, ref: 'Track'}]})
    track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);