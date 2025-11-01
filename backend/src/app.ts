import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth";
import treesRoutes from "./routes/trees";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/trees", treesRoutes);

export default app;
