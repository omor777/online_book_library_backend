import { NextFunction, Request, Response } from "express";
import { pathParamSchema } from "../../../../schema/pathParamSchema";
import { badRequest } from "../../../../utils/error";

import formatErrorMessages from "../../../../utils/formatError";
import { borrowQueryParamSchema } from "../../../../schema/borrowSchema";
import { getHATEOASForItems, getPagination } from "../../../../utils/query";
import borrowServices from "../../../../lib/borrow";

const findAllItemsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  // validate path param [DONE]
  // validate query param [DONE]
  // create findAllItemsUser service
  // if path param is invalid throw error [DONE]
  // if query param is invalid throw error [DONE]
  // generate pagination
  // generate HATEOAS links
  // make response object
  // send response to the client

  //validate path param
  const { success: path_param_success, error: path_param_error } =
    pathParamSchema.safeParse({ id });

  // validate query param
  const {
    success: query_param_success,
    data: query_param_data,
    error: query_param_error,
  } = borrowQueryParamSchema.safeParse(req.query);

  try {
    if (!path_param_success) {
      throw badRequest(path_param_error.errors[0].message);
    }

    if (!query_param_success) {
      const formatted_error = formatErrorMessages(query_param_error, "query");

      res.status(400).json({
        statusCode: 400,
        error: "Bad request!",
        data: formatted_error,
      });
      return;
    }

    const borrowHistory = await borrowServices.findAllItemsUser(req.user.id, {
      page: query_param_data.page,
      limit: query_param_data.limit,
      sort_type: query_param_data.sort_type,
      sort_by: query_param_data.sort_by,
      search: query_param_data.search,
      expand: query_param_data.expand,
      user_fields: query_param_data.user_fields,
      book_fields: query_param_data.book_fields,
    });


    const totalItems = await borrowServices.countBorrowItemsUser(req.user.id);

    // generate pagination
    const pagination = getPagination({
      page: query_param_data.page,
      limit: query_param_data.limit,
      totalItems,
    });

    // generate HATEOAS links
    const links = getHATEOASForItems({
      url: `/users${req.url}`,
      path: `/users${req.path}`,
      hasNext: !!pagination.next_page,
      hasPrev: !!pagination.prev_page,
      page: query_param_data.page,
      limit: query_param_data.limit,
      totalPage: pagination.totalPage,
    });

    const response = {
      statusCode: 200,
      data: borrowHistory,
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default findAllItemsUser;
