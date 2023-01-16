import supertest from "supertest";
import server from "../src/index.ts";
import { mockedUserData } from "../__mocks__/users.js";

describe("CRUD API - success flow", () => {
  let request;
  let userId;

  beforeAll(() => {
    request = supertest(server);
  });

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = { status: 200, data: { users: [] } };

    await request.get("/users").expect(200, response);
  });

  it("Get a new user is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const result = await request.post("/users").send(mockedUserData);

    expect(result.status).toEqual(201);
    expect(result.body.data.user).toEqual(
      expect.objectContaining({ id: expect.any(String), ...mockedUserData })
    );

    userId = result.body.data.user.id;
  });

  it("Get a user by id - GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const result = await request.get(`/users/${userId}`);

    expect(result.status).toEqual(200);
    expect(result.body.data.user).toEqual(
      expect.objectContaining(mockedUserData)
    );
  });

  it("Get updated user - PUT api/users/{userId} request (a response is expected containing an updated object with the same id)", async () => {
    const updateData = {
      username: "Uknown",
      age: 20,
      hobbies: ["sport"],
    };

    const result = await request.put(`/users/${userId}`).send(updateData);

    expect(result.status).toEqual(200);
    expect(result.body.data.user).toEqual(
      expect.objectContaining({ id: userId, ...updateData })
    );
  });

  it("Delete a user - DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const result = await request.delete(`/users/${userId}`);

    expect(result.status).toEqual(204);
    expect(result.body).toEqual("");
  });

  it("User not found - GET api/users/{userId} request, we are trying to get a deleted user by id (expected answer is that there is no such user)", async () => {
    const result = await request.get(`/users/${userId}`);

    expect(result.status).toEqual(404);
    expect(result.body.data).toEqual({
      message: "User does not exist!",
    });
  });
});

describe("CRUD API - failure flow", () => {
  let request;

  beforeAll(() => {
    request = supertest(server);
  });

  it("Should return 'Invalid user id!' error message", async () => {
    const fakeUserId = "test";

    const result = await request.get(`/users/${fakeUserId}`);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Invalid user id!",
    });
  });

  it("Should return 'Request does not contain required fields!' error message", async () => {
    const badData = {
      username: "test",
    };
    const result = await request.post("/users").send(badData);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Request does not contain required fields!",
    });
  });

  it("Should return 'Username must be a string!' error message", async () => {
    const badData = {
      username: 10,
      age: 35,
      hobbies: ["sport"],
    };
    const result = await request.post("/users").send(badData);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Username must be a string!",
    });
  });

  it("Should return 'Age must be a number!' error message", async () => {
    const badData = {
      username: "test",
      age: "35",
      hobbies: ["sport"],
    };
    const result = await request.post("/users").send(badData);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Age must be a number!",
    });
  });

  it("Should return 'Hobbies must be an array!' error message", async () => {
    const badData = {
      username: "test",
      age: 35,
      hobbies: "sport",
    };
    const result = await request.post("/users").send(badData);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Hobbies must be an array!",
    });
  });

  it("Should return 'Hobbies must be an array!' error message", async () => {
    const badData = {
      username: "test",
      age: 35,
      hobbies: "sport",
    };
    const result = await request.post("/users").send(badData);

    expect(result.status).toEqual(400);
    expect(result.body.data).toEqual({
      message: "Hobbies must be an array!",
    });
  });
});
