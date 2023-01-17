import { HTTP_METHODS, IRoute, ROUTES } from "./types";
import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "./controllers/users";

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
  {
    method: HTTP_METHODS["POST"],
    pathname: ROUTES["USERS"],
    controller: createUserController,
  },
  {
    method: HTTP_METHODS["PUT"],
    pathname: ROUTES["USER"],
    controller: updateUserController,
  },
  {
    method: HTTP_METHODS["DELETE"],
    pathname: ROUTES["USER"],
    controller: deleteUserController,
  },
];

export default routes;
