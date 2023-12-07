import express, {Application} from 'express';
import dotenv from 'dotenv';
import Chatbot from "./routes/Chatbot";
import cors from "cors"

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use("/chatbot", Chatbot)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});