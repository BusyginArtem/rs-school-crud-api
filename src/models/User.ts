import { v4 as uuidv4 } from "uuid";
import { ID, IUser } from "../types";

export const ALL_USERS: IUser[] = [
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

export const getAllUsers = (): IUser[] => ALL_USERS;

export const getUserById = (id: ID): IUser | null => {
  const user = ALL_USERS.find((item) => item.id === id);

  if (user) {
    return user;
  }

  return null;
};

// export const getUserById = (userId: string): OperationResult => {
//   const user = ALL_USERS.find((user) => user.id === userId);

//   if (user) {
//     return { isDone: true, statusCode: 200, data: user };
//   } else {
//     return { isDone: false, statusCode: 404, message: USER_DOES_NOT_EXIST };
//   }
// };

// export const createUser = (userData: Omit<User, "id">): OperationResult => {
//   const validation = validateFields(userData);

//   if (validation.isDone) {
//     const id = randomUUID();
//     const { username, age, hobbies } = userData;
//     const newUserData = { id, username, age, hobbies };
//     ALL_USERS.push(newUserData);

//     return { isDone: true, statusCode: 201, data: newUserData };
//   }
//   return { isDone: false, statusCode: 400, message: validation.message };
// };

// export const updateUserById = (
//   userId: string,
//   newUserData: Omit<User, "id">
// ): OperationResult => {
//   const userIndex = ALL_USERS.findIndex((user) => user.id === userId);

//   if (userIndex !== -1) {
//     const validation = validateFields(newUserData);

//     if (validation.isDone) {
//       const { username, age, hobbies } = newUserData;
//       const updatedUserData = { id: userId, username, age, hobbies };
//       ALL_USERS.splice(userIndex, 1, updatedUserData);

//       return { isDone: true, statusCode: 200, data: updatedUserData };
//     } else {
//       return { isDone: false, statusCode: 400, message: validation.message };
//     }
//   }

//   return { isDone: false, statusCode: 404, message: USER_DOES_NOT_EXIST };
// };

// export const removeUserById = (
//   userId: string
// ): Omit<GoodResult, "data"> | BadResult => {
//   //TODO: check if id is valid
//   const userIndex = ALL_USERS.findIndex((user) => user.id === userId);

//   if (userIndex !== -1) {
//     ALL_USERS.splice(userIndex, 1);
//     return { isDone: true, statusCode: 204 };
//   } else {
//     return { isDone: false, statusCode: 404, message: USER_DOES_NOT_EXIST };
//   }
// };
