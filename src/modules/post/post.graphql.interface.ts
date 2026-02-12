import { PostStatusEnum } from "./post.enum";

export interface IGraphqlPostUpdate {
  id: string;
  title?: string;
  content?: string;
  thumbnail?: string;
  status?: PostStatusEnum;
}
