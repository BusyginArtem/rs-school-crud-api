import { IncomingMessage, ServerResponse } from "http";
//
import { HTTP_CODES, HTTP_METHODS, IRoute, ROUTES } from "./types";
import { getAllUsersController, getUserController } from "./controllers/users";
import { NOT_FOUND_MESSAGE } from "./constants";

const routes: IRoute[] = [
  {
    method: HTTP_METHODS["GET"],
    pathname: ROUTES["USERS"],
    controller: getAllUsersController,
  },
  {
    method: HTTP_METHODS["GET"],
    pathname: ROUTES["USER"],
    controller: getUserController,
  },
];

const routing = (req: IncomingMessage, res: ServerResponse) => {
  for (const route of routes) {
    const params = new RegExp(
      route.pathname.replace(":id", "(?<id>(.*))")
    ).exec(req.url);

    if (route.method !== req.method) continue;
    if (route.pathname !== req.url && (!params || !params.groups)) continue;
    console.log(params, "555555555555555");

    route.controller(res, { id: params.groups.id });

    return;
  }

  const result = {
    status: HTTP_CODES["NotFound"],
    data: { message: NOT_FOUND_MESSAGE },
  };

  res.writeHead(HTTP_CODES["NotFound"]);
  res.end(JSON.stringify(result));
};

export default routing;
