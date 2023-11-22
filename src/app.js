
import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .use(router);

//export function init(): Promise<Express> {
//    connectDb();
//    return PromA linguagem do desafio deve ser JavaScript.ise.resolve(app);
//}

//export async function close(): Promise<void> {
//    await disconnectDB();
//}

export default app;
