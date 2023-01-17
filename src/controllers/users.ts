import { validate as uuidValidate } from "uuid";
//
import { CONTROLLER_PARAMS, IUser } from "../types";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from "../models/Users";
import getRequestData from "../helpers/getRequestData";
import {
  writeAndSendJsonData,
  validateUserFields,
  checkRequestUserFields,
} from "../helpers/index";

export const getAllUsersController = ({ res }: CONTROLLER_PARAMS): void => {
  try {
    const users: IUser[] = getAllUsers();

    writeAndSendJsonData("OK", { users }, res);
  } catch {
    writeAndSendJsonData(
      "InternalServerError",
      { message: "Sorry, unexpected error" },
      res
    );
  }
};

export const getUserController = ({
  res,
  params: { id },
}: CONTROLLER_PARAMS): void => {
  try {
    if (!uuidValidate(id)) {
      writeAndSendJsonData("BadRequest", { message: "Invalid user id!" }, res);
    }

    const user: IUser = getUserById(id);

    if (!user && uuidValidate(id)) {
      writeAndSendJsonData(
        "NotFound",
        { message: "User does not exist!" },
        res
      );
    }

    if (user && uuidValidate(id)) {
      writeAndSendJsonData("OK", { user }, res);
    }
  } catch {
    writeAndSendJsonData(
      "InternalServerError",
      { message: "Sorry, unexpected error" },
      res
    );
  }
};

export const createUserController = async ({ res, req }: CONTROLLER_PARAMS) => {
  try {
    const fields: Omit<IUser, "id"> = await getRequestData(req);

    const isValid =
      validateUserFields(fields, res) && checkRequestUserFields(fields, res);

    if (isValid) {
      const user = createUser(fields);

      writeAndSendJsonData("Created", { user }, res);
    }
  } catch {
    writeAndSendJsonData(
      "InternalServerError",
      { message: "Sorry, unexpected error" },
      res
    );
  }
};

export const updateUserController = async ({
  res,
  req,
  params: { id },
}: CONTROLLER_PARAMS) => {
  try {
    if (!uuidValidate(id)) {
      writeAndSendJsonData("BadRequest", { message: "Invalid user id!" }, res);
    }

    const user: IUser = getUserById(id);

    if (!user && uuidValidate(id)) {
      writeAndSendJsonData(
        "NotFound",
        { message: "User does not exist!" },
        res
      );
    }

    const fields: Omit<IUser, "id"> = await getRequestData(req);

    const isValid = validateUserFields(fields, res);

    if (isValid) {
      const updatedUser = updateUser(user, fields);

      writeAndSendJsonData("OK", { user: updatedUser }, res);
    }
  } catch {
    writeAndSendJsonData(
      "InternalServerError",
      { message: "Sorry, unexpected error" },
      res
    );
  }
};

export const deleteUserController = async ({
  res,
  params: { id },
}: CONTROLLER_PARAMS) => {
  try {
    if (!uuidValidate(id)) {
      writeAndSendJsonData("BadRequest", { message: "Invalid user id!" }, res);
    }

    const user: IUser = getUserById(id);

    if (!user && uuidValidate(id)) {
      writeAndSendJsonData(
        "NotFound",
        { message: "User does not exist!" },
        res
      );
    }

    if (user) {
      deleteUserById(user.id);

      writeAndSendJsonData("NoContent", null, res);
    }
  } catch {
    writeAndSendJsonData(
      "InternalServerError",
      { message: "Sorry, unexpected error" },
      res
    );
  }
};
