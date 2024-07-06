import { Router } from "express";
import { getAllDuties } from "../controllers/duties";

const dutiesRouter = Router();

dutiesRouter.get("/", getAllDuties);

export default dutiesRouter;
