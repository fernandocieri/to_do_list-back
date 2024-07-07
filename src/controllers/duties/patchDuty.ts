import { Request, Response } from "express";
import DutyManager from "../../managers/duties.manager";

export const patchDuty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Id field must be a string" });
    }

    const duty = await DutyManager.getDuty(id);
    if (!duty) {
      return res.status(404).json({ message: "Duty not found" });
    }

    const { name, done } = req.body;
    const updates: { name?: string; done?: boolean } = {};

    if (name !== undefined) {
      if (typeof name !== "string") {
        return res.status(400).json({ message: "Name field must be a string" });
      }
      updates.name = name;
    }

    if (done !== undefined) {
      if (typeof done !== "boolean") {
        return res
          .status(400)
          .json({ message: "Done field must be a boolean" });
      }
      updates.done = done;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    await DutyManager.updateDuty(id, updates);

    res.status(200).json({ message: "Duty updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown server error occurred" });
    }
  }
};
