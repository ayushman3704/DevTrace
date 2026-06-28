import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import pageRoutes from "./routes/page.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);

app.use("/activity/page", pageRoutes);

export default app;