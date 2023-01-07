import { ServerResponse } from "http";
import { validate as uuidValidate } from "uuid";
//
import { HTTP_CODES, IUser, PARAMS } from "../types";
import { getAllUsers, getUserById } from "../models/User";

export const getAllUsersController = (res: ServerResponse): void => {
  const users: IUser[] = getAllUsers();
  console.log("getAllUsersController");

  res.writeHead(HTTP_CODES["OK"], { "Content-Type": "application/json" });

  const result = { status: HTTP_CODES["OK"], data: { users } };

  res.write(JSON.stringify(result));
  res.end();
};

export const getUserController = (
  res: ServerResponse,
  { id }: PARAMS
): void => {
  console.log("getUserController");
  let result = {};

  if (!uuidValidate(id)) {
    res.writeHead(HTTP_CODES["BadRequest"], {
      "Content-Type": "application/json",
    });
    result = {
      status: HTTP_CODES["BadRequest"],
      data: { message: "Invalid user id!" },
    };
    res.write(JSON.stringify(result));
    res.end();
  }

  const user: IUser = getUserById(id);

  if (!user) {
    res.writeHead(HTTP_CODES["NotFound"], {
      "Content-Type": "application/json",
    });
    result = {
      status: HTTP_CODES["NotFound"],
      data: { message: "User does not exist!" },
    };
    res.write(JSON.stringify(result));
    res.end();
  }

  if (user) {
    res.writeHead(HTTP_CODES["OK"], { "Content-Type": "application/json" });
    result = { status: HTTP_CODES["OK"], data: { user } };
    res.write(JSON.stringify(result));
    res.end();
  }
};
