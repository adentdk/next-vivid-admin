export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  orderType?: "asc" | "desc";
};