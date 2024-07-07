import { Router } from "express";
import { getAllDuties, postDuty } from "../controllers/duties";

const dutiesRouter = Router();

dutiesRouter.get("/", getAllDuties);
dutiesRouter.post("/", postDuty);

export default dutiesRouter;
