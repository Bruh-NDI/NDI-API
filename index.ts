import express, { Application } from 'express';
import dotenv from 'dotenv';
import TestRoute from "./routes/TestRoute";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/test", TestRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});