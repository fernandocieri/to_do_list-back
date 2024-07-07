import { queryDatabase } from "../config/db";
import Duty from "../models/duties.models";

class DutyManager {
  async getDuties(): Promise<Duty[]> {
    const rows = await queryDatabase("SELECT * FROM duties");
    return rows.map((row: any) => new Duty(row.id, row.name, row.done));
  }

  async getDuty(id: string): Promise<Duty | null> {
    const rows = await queryDatabase("SELECT * FROM duties WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Duty(row.id, row.name, row.done);
  }

  async createDuty(name: string): Promise<void> {
    await queryDatabase("INSERT INTO duties (name) VALUES ($1)", [name]);
  }

  async updateDuty(
    id: string,
    updates: { name?: string; done?: boolean }
  ): Promise<void> {
    const fields: string[] = [];
    const values: (string | boolean)[] = [];
    let index = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(updates.name);
    }

    if (updates.done !== undefined) {
      fields.push(`done = $${index++}`);
      values.push(updates.done);
    }

    if (fields.length === 0) {
      throw new Error("No valid fields to update");
    }

    values.push(id);
    const setClause = fields.join(", ");
    const query = `UPDATE duties SET ${setClause} WHERE id = $${index}`;

    await queryDatabase(query, values);
  }

  async deleteDuty(id: string): Promise<void> {
    await queryDatabase("DELETE FROM duties WHERE id = $1", [id]);
  }
}

export default new DutyManager();
