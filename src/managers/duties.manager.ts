import { queryDatabase } from "../config/db";
import Duty from "../models/duties.models";

class DutyManager {
  async getDuties(): Promise<Duty[]> {
    const rows = await queryDatabase("SELECT * FROM duties");
    return rows.map((row: any) => new Duty(row.id, row.name));
  }

  async createDuty(name: string): Promise<void> {
    await queryDatabase("INSERT INTO duties (name) VALUES ($1)", [name]);
  }
}

export default new DutyManager();
