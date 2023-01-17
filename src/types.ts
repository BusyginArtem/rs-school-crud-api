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

export type CONTROLLER_PARAMS = {
  res: ServerResponse;
  req: IncomingMessage;
  params: PARAMS;
};

type ReverseMap<T> = T[keyof T];
export interface IRoute {
  method: keyof typeof HTTP_METHODS;
  pathname: ReverseMap<typeof ROUTES>;
  controller: (params: CONTROLLER_PARAMS) => void;
}

export enum HTTP_CODES {
  OK = 200,
  Created = 201,
  NoContent = 204,
  Success = OK | Created,
  BadRequest = 400,
  NotFound = 404,
  ClientErrors = BadRequest | NotFound,
  InternalServerError = 500,
}

export type HTTP_CODES_KEYS = keyof typeof HTTP_CODES;

export type ID = string;

export type PARAMS = {
  id?: ID | null;
  data?: Omit<IUser, "id">;
};
