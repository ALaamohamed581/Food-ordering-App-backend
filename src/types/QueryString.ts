export type QueryString = {
  fields: string;
  page?: number;
  limit: number;
  skip: number;
  sort: any;
  queryStr: any;
};

export type paginatedData = {
  data: any;
  numberOfPages: number;
  page: number;
};
