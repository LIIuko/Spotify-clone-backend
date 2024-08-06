import { Body, Controller, Delete, Get, Param, Post, Request } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Public } from "../auth/public.decorator";

@Controller("/tracks")
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post()
    create(@Request() req, @Body() dto: CreateTrackDto) {
        return this.trackService.create(req.user, dto);
    }

    @Public()
    @Get()
    getAll() {
        return this.trackService.getAll();
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
}
