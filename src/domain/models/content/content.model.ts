import { StateContent, TypeContent } from "src/base/utils/enums";

export interface ContentModel {
    contentID : string,
    courseID : string,
    title : string,
    description : string,
    type : TypeContent,
    duration : number,
    stateContent : StateContent,
}