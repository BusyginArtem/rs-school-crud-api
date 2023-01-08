import { ServerResponse } from "http";
//
import { HTTP_CODES, HTTP_CODES_KEYS, IUser } from "../types";

export default (
  statusCode: HTTP_CODES_KEYS,
  data: { user: IUser } | { users: IUser[] } | { message: string } | null,
  res: ServerResponse
) => {
  const result = { status: HTTP_CODES[statusCode], data };

  res.writeHead(HTTP_CODES[statusCode], {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(result));
};
