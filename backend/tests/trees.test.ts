import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

describe("Trees routes", () => {
  let token: string;

  beforeAll(async () => {
    const username = `user${Date.now()}`;
    await request(app)
      .post("/auth/register")
      .send({ username, password: "pwd" });
    const loginRes = await request(app)
      .post("/auth/login")
      .send({ username, password: "pwd" });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a tree and returns root node", async () => {
    const createRes = await request(app)
      .post("/trees")
      .set("Authorization", `Bearer ${token}`)
      .send({ startNumber: 10 });
    console.log("Token:", token);
    expect(createRes.status).toBe(200);
    expect(createRes.body).toHaveProperty("tree");
    expect(createRes.body).toHaveProperty("rootNode");
    expect(createRes.body.rootNode.result).toBe(10);
  });

  it("fetches trees", async () => {
    const res = await request(app).get("/trees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
