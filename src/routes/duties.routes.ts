import { Router } from "express";
import { getAllDuties, postDuty, patchDuty, deleteDuty } from "../controllers/duties";

const dutiesRouter = Router();

dutiesRouter.get("/", getAllDuties);

dutiesRouter.post("/", postDuty);

dutiesRouter.patch("/:id", patchDuty);

dutiesRouter.delete("/:id", deleteDuty);

export default dutiesRouter;
