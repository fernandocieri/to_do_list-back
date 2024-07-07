import { Request, Response } from "express";
import DutyManager from "../../managers/duties.manager";

export const deleteDuty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Id field must be a string" });
    }

    const duty = await DutyManager.getDuty(id);
    if (!duty) {
      return res.status(404).json({ message: "Duty not found" });
    }

    await DutyManager.deleteDuty(id);

    res.status(204).json();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown server error occurred" });
    }
  }
};
