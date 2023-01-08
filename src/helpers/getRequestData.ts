import { IncomingMessage } from "http";
import { IUser } from "../types";

export default (req: IncomingMessage): Promise<Omit<IUser, "id">> => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};
