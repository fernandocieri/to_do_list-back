import { Router } from "express";
import { getAllDuties, postDuty, patchDuty } from "../controllers/duties";

const dutiesRouter = Router();

dutiesRouter.get("/", getAllDuties);
dutiesRouter.post("/", postDuty);
dutiesRouter.patch("/:id", patchDuty);

export default dutiesRouter;
