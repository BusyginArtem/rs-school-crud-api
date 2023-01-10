import * as dotenv from "dotenv";
import { createServer } from "http";
import routing from "./routing";

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = createServer();

server.on("request", routing);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default server;
