import { v4 as uuidv4 } from "uuid";

export const mockedUsers = [
  {
    id: uuidv4(),
    username: "Artem",
    age: 35,
    hobbies: ["cooking", "reading"],
  },
  {
    id: uuidv4(),
    username: "Hlib",
    age: 8,
    hobbies: ["playing console games", "walking"],
  },
  {
    id: uuidv4(),
    username: "Karina",
    age: 35,
    hobbies: ["cooking", "dancing", "painting"],
  },
];

export const mockedUserData = {
  username: "Artem",
  age: 35,
  hobbies: ["cooking", "reading"],
};
