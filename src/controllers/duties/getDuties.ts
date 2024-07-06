import { Request, Response } from "express";
import DutyManager from "../../managers/duties.manager";

export const getAllDuties = async (req: Request, res: Response) => {
  try {
    const duties = await DutyManager.getDuties();
    res.json(duties);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown server error occurred" });
    }
  }
};
