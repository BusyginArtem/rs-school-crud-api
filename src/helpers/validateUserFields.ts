import { ServerResponse } from "http";
//
import { IUser } from "../types";
import writeAndSendJsonData from "./writeAndSendJsonData";

export default (data: Omit<IUser, "id">, res: ServerResponse): Boolean => {
  let isValid = true;

  if (data["username"] && typeof data.username !== "string" && isValid) {
    writeAndSendJsonData(
      "BadRequest",
      {
        message: "Username must be a string!",
      },
      res
    );

    isValid = false;
  }

  if (data["age"] && typeof data.age !== "number" && isValid) {
    writeAndSendJsonData(
      "BadRequest",
      {
        message: "Age must be a number!",
      },
      res
    );

    isValid = false;
  }

  if (data["hobbies"] && typeof data.hobbies !== "object" && isValid) {
    writeAndSendJsonData(
      "BadRequest",
      {
        message: "Hobbies must be an array!",
      },
      res
    );

    isValid = false;
  }

  return isValid;
};
