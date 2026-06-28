import { Router } from "express";

import { addPage, getPages } from "../controllers/page.controller.js";

const router = Router();

router.post("/", addPage);

router.get("/", getPages);

export default router;