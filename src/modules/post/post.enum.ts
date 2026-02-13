import { CommonSortFields } from "../../types/sorting";

export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;
export type PostStatusEnum = (typeof PostStatus)[keyof typeof PostStatus];

export const PostSortFields = {
  ...CommonSortFields,
  STATUS: "status",
} as const;
export type PostSortFieldEnum =
  (typeof PostSortFields)[keyof typeof PostSortFields];
