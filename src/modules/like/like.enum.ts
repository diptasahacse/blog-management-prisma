export const LikeType = {
  LIKE: "LIKE",
  LOVE: "LOVE",
  SAD: "SAD",
  HAHA: "HAHA",
  ANGRY: "ANGRY",
  CRY: "CRY",
} as const;
export type LikeTypeEnum = (typeof LikeType)[keyof typeof LikeType];
