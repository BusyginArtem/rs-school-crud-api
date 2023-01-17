import { v4 as uuidv4 } from "uuid";
import { ID, IUser } from "../types";

export let ALL_USERS: IUser[] = [];

export const getAllUsers = (): IUser[] => ALL_USERS;

export const getUserById = (id: ID): IUser | null => {
  const user = ALL_USERS.find((item) => item.id === id);

  if (user) {
    return user;
  }

  return null;
};

export const createUser = ({
  username,
  age,
  hobbies,
}: Omit<IUser, "id">): IUser => {
  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  ALL_USERS.push(newUser);

  return newUser;
};

export const updateUser = (
  user: IUser,
  newUserData: Omit<IUser, "id">
): IUser => {
  const updatedUser = {
    id: user.id,
    username: newUserData.username ? newUserData.username : user.username,
    age: newUserData.age ? newUserData.age : user.age,
    hobbies: newUserData.hobbies ? newUserData.hobbies : user.hobbies,
  };

  ALL_USERS = ALL_USERS.map((item) => {
    if (item.id === user.id) {
      return {
        ...updatedUser,
      };
    }

    return item;
  });

  return updatedUser;
};

export const deleteUserById = (id: ID): void => {
  ALL_USERS = ALL_USERS.filter((user) => user.id !== id);
};

export const setUsers = (users: IUser[]): void => {
  ALL_USERS = users;
};
