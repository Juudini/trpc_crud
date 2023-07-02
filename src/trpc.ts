import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
});

const t = initTRPC.context().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
