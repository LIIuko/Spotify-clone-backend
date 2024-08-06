import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as monoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Track } from "./track.schemas";
import { User } from "../../user/schemas/user.schemas";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    text: string;
    @Prop({ type: monoose.Schema.Types.ObjectId, ref: "User" })
    username: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
