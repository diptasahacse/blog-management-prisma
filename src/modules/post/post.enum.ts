export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;
export type PostStatusEnum = (typeof PostStatus)[keyof typeof PostStatus];

export type PostQueryType = {
  search?: string;
  title?: string;
  status?: PostStatusEnum;
  owner_id?: string;
  id?: string;
};
