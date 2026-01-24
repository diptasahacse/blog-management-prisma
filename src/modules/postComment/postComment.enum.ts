export const PostCommentStatus = {
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
} as const;
export type PostCommentStatusType =
  (typeof PostCommentStatus)[keyof typeof PostCommentStatus];
