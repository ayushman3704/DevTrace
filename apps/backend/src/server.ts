import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`DevTrace Backend running on http://localhost:${PORT}`);
});