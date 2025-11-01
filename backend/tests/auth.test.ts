import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

describe("Auth routes", () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should register and login a user", async () => {
    const username = `user${Date.now()}`;
    const password = "pass123";

    const resReg = await request(app)
      .post("/auth/register")
      .send({ username, password })
      .set("Accept", "application/json");

    expect(resReg.status).toBe(200);
    expect(resReg.body.user).toHaveProperty("username", username);

    const resLogin = await request(app)
      .post("/auth/login")
      .send({ username, password })
      .set("Accept", "application/json");

    expect(resLogin.status).toBe(200);
    expect(resLogin.body).toHaveProperty("token");
  });
});
