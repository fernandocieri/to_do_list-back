import request from 'supertest';
import { app, server } from '../src/index';
import { queryDatabase } from '../src/config/db';

describe("Duties API", () => {
  beforeAll(async () => {
    await queryDatabase(
      "CREATE TABLE IF NOT EXISTS duties (id UUID PRIMARY KEY, name VARCHAR(255), done BOOLEAN)"
    );
  });

  afterAll(async () => {
    await queryDatabase('DROP TABLE IF EXISTS duties');
    server.close();
    await (queryDatabase as any).pool.end();
  });

  describe("GET /api/v0/duties", () => {
    it("should return an array of duties", async () => {
      const response = await request(app).get("/api/v0/duties");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /api/v0/duties", () => {
    it("should create a new duty", async () => {
      const newDuty = { name: "Test duty" };
      const response = await request(app).post("/api/v0/duties").send(newDuty);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should return 400 if name is not a string", async () => {
      const newDuty = { name: 123 };
      const response = await request(app).post("/api/v0/duties").send(newDuty);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Name field must be a string"
      );
    });
  });

  describe("PATCH /api/v0/duties/:id", () => {
    it("should update a duty", async () => {
      const newDuty = { name: "Test duty" };
      const createResponse = await request(app)
        .post("/api/v0/duties")
        .send(newDuty);
      const dutyId = createResponse.body.id;

      const updates = { name: "Updated duty" };
      const response = await request(app)
        .patch(`/api/v0/duties/${dutyId}`)
        .send(updates);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Duty updated successfully"
      );
    });

    it("should return 400 if id is not uuid", async () => {
      const updates = { name: "Updated duty" };
      const response = await request(app)
        .patch(`/api/v0/duties/non-existent-id`)
        .send(updates);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Id is not valid");
    });

    it("should return 404 if duty is not found", async () => {
      const updates = { name: "Updated duty" };
      const response = await request(app)
        .patch(`/api/v0/duties/48a53bd9-f5a0-4357-a87a-d0119eb7eff8`)
        .send(updates);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Duty not found");
    });
  });

  describe("DELETE /api/v0/duties/:id", () => {
    it("should delete a duty", async () => {
      const newDuty = { name: "Test duty" };
      const createResponse = await request(app)
        .post("/api/v0/duties")
        .send(newDuty);
      const dutyId = createResponse.body.id;

      const response = await request(app).delete(`/api/v0/duties/${dutyId}`);
      expect(response.status).toBe(204);
    });

    it("should return 400 if id is not uuid", async () => {
      const response = await request(app).delete(
        `/api/v0/duties/non-existent-id`
      );
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Id is not valid");
    });
  });
});
