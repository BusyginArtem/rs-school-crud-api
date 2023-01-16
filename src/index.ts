import * as dotenv from "dotenv";
import { createServer } from "http";
import routing from "./routing";

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = createServer(routing);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    process.exit(0);
  });
});

export default server;
