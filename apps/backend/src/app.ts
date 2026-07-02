import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import pageRoutes from "./routes/page.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const app = express();

app.use(
  cors({
    // origin: "http://localhost:5173"

    origin: true
  })
);

// const allowedOrigins = [
//   "chrome-extension://<your-extension-id>",
//   "http://localhost:5173"
// ];

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     }
//   })
// );

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/activity/page", pageRoutes);

app.use("/activity/session", sessionRoutes);

export default app;