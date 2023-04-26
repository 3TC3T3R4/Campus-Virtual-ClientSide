import { TypeContent } from "src/base/utils/enums";

export interface CreateContentCommand {
    courseID : string,
    title : string,
    description : string,
    type : TypeContent,
    duration : number
}