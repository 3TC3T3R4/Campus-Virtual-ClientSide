import { StateContent, TypeContent } from "src/base/utils/enums";

export interface UpdateContentCommand {
    courseID : string,
    title : string,
    description : string,
    type : TypeContent,
    duration : number,
    stateContent : StateContent
}