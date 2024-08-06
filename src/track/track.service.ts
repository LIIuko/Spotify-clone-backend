import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schemas";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Model, ObjectId } from "mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDocument } from "../user/schemas/user.schemas";
import { FileService } from "../file/file.service";
import { FileType } from "../utils/file.type";

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService) {
    }

    async create(user: UserDocument, dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath: string = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath: string = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({
            ...dto,
            artist: user.id,
            audio: audioPath,
            picture: picturePath,
            listens: 0
        });
        return track;
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset * count).limit(count);
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate([
            {
                path: "comments",
                populate: {
                    path: 'username',
                    select: {username : 1},
                }
            },
            {
                path: "artist",
                select: {username : 1}
            }
        ]);
        return track;
    }

    async delete(user: UserDocument, id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findOneAndDelete({_id: id, artist: user.id});
        return track.id;
    }

    async addComment(user: UserDocument, dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({
            ...dto,
            username: user.id
        });
        track.comments.push(comment.id);
        await track.save();
        return comment;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            title: {$regex: new RegExp(query, 'i')}
        });
        return tracks;
    }
}
