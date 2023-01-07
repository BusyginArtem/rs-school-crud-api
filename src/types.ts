import { IncomingMessage, ServerResponse } from "http";

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum ROUTES {
  USERS = "/users",
  USER = "/users/:id",
}

export enum HTTP_METHODS {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
}

type HTTP_METHOD_KEYS = keyof typeof HTTP_METHODS;

export interface IRoute {
  method: HTTP_METHOD_KEYS;
  pathname: string;
  controller: (res: ServerResponse, params: object) => void;
}

export enum HTTP_CODES {
  OK = 200,
  Created = 201,
  Success = OK | Created,
  BadRequest = 400,
  NotFound = 404,
  ClientErrors = BadRequest | NotFound,
  InternalServerError = 500,
}

export type ID = string;

export type PARAMS = {
  id: ID | null;
};
