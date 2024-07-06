import { Request, Response } from "express";
import DutyManager from "../../managers/duties.manager";

export const postDuty = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (typeof name !== "string") {
      return res.status(400).json({ message: "Name field must be a string" });
    }

    await DutyManager.createDuty(name);

    res.status(201).json({ message: "Duty created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown server error occurred" });
    }
  }
};
