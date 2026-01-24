export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;
export type PostStatusEnum = (typeof PostStatus)[keyof typeof PostStatus];
