import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevTrace Backend is healthy",
  });
});

export default router;