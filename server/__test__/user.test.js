const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const { expect, it, describe, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      email: "user@example.com",
      password: "1234",
      name: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const user = await User.findByPk(1);

  access_token = signToken({ id: user.id });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /users/profiles, ", () => {
  it("Berhasil get user profiles", async () => {
    const response = await request(app)
      .get("/users/profiles")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
  });
});

describe("PUT /users/profiles, ", () => {
  it("Berhasil update user", async () => {
    const response = await request(app)
      .post("/users/profiles")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        name: "Wahyudi Aditya Pratama",
        favoriteGenres: "Action,commedy,rommance",
        favoriteActors: "Christ Hamsworth, Robert Downy Jr",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("gagal karena name tidak ada", async () => {
    const response = await request(app)
      .post("/users/profiles")
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        favoriteGenres: "Action,commedy,rommance",
        favoriteActors: "Christ Hamsworth, Robert Downy Jr",
      });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});

describe("GET /users/recommendations, ", () => {
  it("get user recommendations", async () => {
    const response = await request(app)
      .get("/users/recommendations")
      .set("Authorization", `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response[0].body).toHaveProperty("id");
  });
});
