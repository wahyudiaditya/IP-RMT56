const app = require("../app");
const { hashPassword } = require("../helpers/bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { expect, it, describe, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");

beforeAll(async () => {
  const hash = hashPassword("1234");
  await queryInterface.bulkInsert("Users", [
    {
      email: "user@example.com",
      password: hash,
      name: "John Doe",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /auths/login.", () => {
  it("Berhasil login dan mengirimkan access_token", async () => {
    const response = await request(app).post("/auths/login").send({
      email: "user@example.com",
      password: "1234",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const response = await request(app).post("/auths/login").send({
      password: "1234",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const response = await request(app).post("/auths/login").send({
      email: "user@example.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  it("Password diberikan salah / tidak match", async () => {
    const response = await request(app).post("/auths/login").send({
      email: "user@example.com",
      password: "password1222232313",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
});

describe("POST /auths/register.", () => {
  it("Berhasil register", async () => {
    const response = await request(app).post("/auths/register").send({
      email: "user2@example.com",
      password: "1234",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Register Successful");
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const response = await request(app).post("/auths/register").send({
      password: "1234",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const response = await request(app).post("/auths/register").send({
      email: "user@example.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
});
