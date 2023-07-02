import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../src/app";

export const trpc = createTRPCReact<AppRouter>();
