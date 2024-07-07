import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();

const port = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v0", router);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app, server };
