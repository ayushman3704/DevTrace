import { Router } from "express";

import {
  getSessions,
  getSessionDetails,
} from "../controllers/session.controller.js";

const router = Router();

router.get("/", getSessions);

router.get("/:id", getSessionDetails);

export default router;