import { ObjectId } from "mongoose";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    readonly text: string;
    @IsNotEmpty()
    readonly trackId: ObjectId;
}
