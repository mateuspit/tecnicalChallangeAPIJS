
import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../swaggerOptions.js";

const HEALTH_ROUTE = "/health";
const HEALTH_MESSAGE = "I'm online!";
const API_DOCS_ROUTE = "/api-docs";

const app = express();

const specs = swaggerJSDoc(swaggerOptions);

app
    .use(cors())
    .use(express.json())
    .get(HEALTH_ROUTE, (_req, res) => res.send(HEALTH_MESSAGE))
    .use(API_DOCS_ROUTE, swaggerUi.serve, swaggerUi.setup(specs))
    .use(router);

export default app;
