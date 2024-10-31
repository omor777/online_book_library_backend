import { Request, Response, NextFunction } from "express";
import defaults from "../../../../config/defaults";
import { services as bookService } from "../../../../lib/book";
import { getHATEOASForItems, getPagination } from "../../../../utils/query";

const findAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt((req.query.page as string) || "1");
  const limit = parseInt((req.query.limit as string) || "10");
  const sort_type = (req.query.sort_type as string) || defaults.sortType;
  const sort_by = (req.query.sort_by as string) || defaults.sortBy;
  const search = (req.query.search as string) || defaults.search;

  try {
    const books = await bookService.findAllItems({
      page,
      limit,
      sort_type,
      sort_by,
      search,
    });

    //pagination
    const totalItems = await bookService.count({ search });
    const pagination = getPagination({ page, limit, totalItems });

    // HATEOAS links
    const links = getHATEOASForItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next_page,
      hasPrev: !!pagination.prev_page,
      page,
      limit,
      totalPage: pagination.totalPage,
    });

    const response = {
      statusCode: 200,
      data: books,
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default findAllItems;
