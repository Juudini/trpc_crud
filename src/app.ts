import Express from "express";
import morgan from "morgan";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router, createContext } from "./trpc";
import { notesRouter } from "./routes/notes";
import cors from "cors";
import path from "path";

const app = Express();

const appRouter = router({
    note: notesRouter,
});

app.use(cors());
app.use(morgan("dev"));

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.use(Express.static(path.join(__dirname, "../client/dist")));

export type AppRouter = typeof appRouter;

export default app;
