import { createTRPCRouter } from "~/server/api/trpc";
import { sessionRouter } from "./routers/session";
import { gameRouter } from "./routers/game";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  session: sessionRouter,
  game: gameRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
