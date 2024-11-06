import defaults from "../config/defaults";
import generateQueryString from "./qs";

type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
  next_page?: number;
  prev_page?: number;
};

const getPagination = ({
  page = defaults.page,
  limit = defaults.limit,
  totalItems = defaults.totalItems,
}) => {
  const totalPage = Math.ceil(totalItems / limit);

  const pagination: Pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };
  if (page < totalPage) {
    pagination.next_page = page + 1;
  }
  if (page > 1) {
    pagination.prev_page = page - 1;
  }

  return pagination;
};

type HATEOASLinks = {
  self: string;
  first: string;
  last: string;
  next?: string;
  prev?: string;
};

const getHATEOASForItems = ({
  url = "/",
  path = "/",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
  limit = 10,
  totalPage = 1,
}) => {
  const links: HATEOASLinks = {
    self: url,
    first: `${path}?page=1&limit=${limit}`,
    last: `${path}?page=${totalPage}&limit=${limit}`,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryStr}&limit=${limit}`;
  }
  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links.prev = `${path}?${queryStr}&limit=${limit}`;
  }

  return links;
};

export { getPagination, getHATEOASForItems };
