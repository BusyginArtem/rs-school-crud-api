import { ServerResponse } from "http";
//
import { IUser } from "../types";
import writeAndSendJsonData from "./writeAndSendJsonData";

export default (data: Omit<IUser, "id">, res: ServerResponse): Boolean => {
  if (!data["username"] || !data["age"] || !data["hobbies"]) {
    writeAndSendJsonData(
      "BadRequest",
      {
        message: "Request does not contain required fields!",
      },
      res
    );

    return false;
  }

  return true;
};
