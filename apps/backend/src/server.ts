import { runMigrations } from "@devtrace/database";

const PORT = 3000;

async function startServer() {
  runMigrations();

  const { default: app } = await import("./app.js");

  app.listen(PORT, () => {
    console.log(`🚀 DevTrace Backend running on http://localhost:${PORT}`);
  });
}

startServer();