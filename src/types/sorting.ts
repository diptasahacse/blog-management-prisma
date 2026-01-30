export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrderEnum = (typeof SortOrder)[keyof typeof SortOrder];

export interface ISortingQuery {
  sort_by?: string | undefined;
  sort_order?: string | undefined;
}
