import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schemas/user.schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(dto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create({ ...dto });
    }

    async getUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
}
