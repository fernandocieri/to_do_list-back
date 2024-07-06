import { Router } from "express";
import dutiesRouter from "./duties.routes";

const router = Router();

router.use("/duties", dutiesRouter);

export default router;
