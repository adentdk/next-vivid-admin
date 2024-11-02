export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  orderType?: "asc" | "desc";
};

export type PaginatitedResponse<T> = {
  pointer: string;
  items: T[];
  total: number;
};
