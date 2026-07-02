import { Router } from "express";

import {
  addPage,
  getPages,
  searchPage,
} from "../controllers/page.controller.js";

const router = Router();

router.post("/", addPage);

router.get("/search", searchPage);

router.get("/", getPages);

export default router;