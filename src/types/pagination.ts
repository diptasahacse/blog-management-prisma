export interface IPaginationQuery {
  page?: number | undefined;
  limit?: number | undefined;
}
export interface IPaginationResponse {
  page: number;
  limit: number;
  total: number;
}
