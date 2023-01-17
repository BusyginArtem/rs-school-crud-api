import * as dotenv from "dotenv";
import http from "http";
import cluster from "cluster";
import { cpus } from "os";
//
import routing from "./routing";
import { ALL_USERS, setUsers } from "./models/Users";
import { IUser } from "./types";

dotenv.config();
const PORT = process.env.PORT || 4000;

const pid = process.pid;

let currPort = Number(PORT) + 1;

const workers: any[] = [];

const users: IUser[] = ALL_USERS;

if (cluster.isPrimary) {
  const count = cpus().length;
  console.log(`Starting ${count} forks`);

  http
    .createServer((request, response) => {
      let options = {
        hostname: "localhost",
        port: currPort,
        path: request.url,
        method: request.method,
        headers: request.headers,
      };

      let proxy = http.request(options, (res) => {
        response.writeHead(res.statusCode, res.headers);

        res.pipe(response, {
          end: true,
        });

        if (currPort === Number(PORT) + count) {
          currPort = Number(PORT) + 1;
        } else {
          currPort = currPort + 1;
        }
      });

      request.pipe(proxy, {
        end: true,
      });
    })
    .listen(PORT);

  for (let i = 0; i < count; i++) {
    const workerPort = Number(PORT) + 1 + i;

    const worker = cluster.fork({
      PORT: workerPort,
    });

    worker.on("message", (msg) => {
      setUsers(msg);
    });

    workers.push({ pid: worker.process.pid, port: workerPort });

    setTimeout(() => {
      worker.send(users);
    }, 1000);
  }

  cluster.on("exit", (worker) => {
    cluster.fork({
      PORT: workers.find((item) => item.process.pid === worker.process.pid)
        .port,
    });
  });
} else {
  const PORT = process.env.PORT;
  const id = cluster.worker.id;

  console.log(`Worker: ${id}, pid: ${pid}`);

  const server = http.createServer(routing);

  process.on("message", (msg: any) => {
    setUsers(msg);
    process.send(msg);
  });

  server.listen(PORT, () => {
    console.log(`Worker server listening on port ${PORT}`);
  });
}
