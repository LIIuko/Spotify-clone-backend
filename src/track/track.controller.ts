import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Request,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Public } from "../auth/public.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/tracks")
export class TrackController {
    constructor(private trackService: TrackService) {
    }


    @Public()
    @Get("/search")
    search(@Query("query") query: string) {
        return this.trackService.search(query);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: "picture", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]))
    create(@Request() req,
           @Body() dto: CreateTrackDto,
           @UploadedFiles() files: {
               picture?: Express.Multer.File[],
               audio?: Express.Multer.File[]
           }) {
        return this.trackService.create(req.user, dto, files.picture[0], files.audio[0]);
    }

    @Public()
    @Get()
    getAll(@Query("count") count: number,
           @Query("offset") offset: number) {
        return this.trackService.getAll(count, offset);
    }

    @Public()
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @Delete(":id")
    delete(@Request() req, @Param("id") id: ObjectId) {
        return this.trackService.delete(req.user, id);
    }

    @Post("/comment")
    addComment(@Request() req, @Body() dto: CreateCommentDto) {
        return this.trackService.addComment(req.user, dto);
    }

    @Public()
    @Post("listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.trackService.listen(id);
    }
}
