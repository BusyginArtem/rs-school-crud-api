import { IncomingMessage, ServerResponse } from "http";
//
import { NOT_FOUND_MESSAGE } from "./constants";
import writeAndSendJsonData from "./helpers/writeAndSendJsonData";
import routes from "./routes";

const routing = (req: IncomingMessage, res: ServerResponse) => {
  let urlNotFound = true;
  const requestStart = Date.now();

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

  res.on("finish", () => {
    const { method, url } = req;
    const { statusCode, statusMessage } = res;

    console.log(`url ------------------------->`, url);
    console.log(`method ------------------------->`, method);

    console.log(
      JSON.stringify({
        processingTime: `${Date.now() - requestStart} ms`,
        response: {
          statusCode,
          statusMessage,
        },
      })
    );
  });
};

export default routing;
