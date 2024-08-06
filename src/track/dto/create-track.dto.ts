import { IsNotEmpty } from "class-validator";

export class CreateTrackDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly text: string;
}
