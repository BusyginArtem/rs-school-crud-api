import { IncomingMessage, ServerResponse } from "http";
//
import { NOT_FOUND_MESSAGE } from "./constants";
import writeAndSendJsonData from "./helpers/writeAndSendJsonData";
import routes from "./routes";

const routing = (req: IncomingMessage, res: ServerResponse) => {
  let urlNotFound = true;

  for (const route of routes) {
    let routeParams = {};

    const reqParams = new RegExp(
      route.pathname.replace(":id", "(?<id>(.*))")
    ).exec(req.url);

    if (route.method !== req.method) continue;
    if (route.pathname !== req.url && (!reqParams || !reqParams.groups))
      continue;

    if (reqParams?.groups) {
      routeParams = { id: reqParams.groups.id };
    }

    route.controller({ res, req, params: routeParams });
    urlNotFound = false;
  }

  if (urlNotFound) {
    writeAndSendJsonData("NotFound", { message: NOT_FOUND_MESSAGE }, res);
  }
};

export default routing;
