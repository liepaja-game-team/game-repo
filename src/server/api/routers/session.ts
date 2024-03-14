import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const sessionRouter = createTRPCRouter({
    create: publicProcedure
        .mutation(async ({ ctx }) => {
            const newSession = await ctx.db.session.create({})
            return newSession.id
        }),
    addUserName: publicProcedure
        .input(z.object({
            id: z.number(),
            userName: z.string()
                .min(2, 'Username must be at least 2 characters long')
                .max(32, "Username can not contain more than 32 characters")
        }))
        .mutation(async ({ ctx, input }) => {
            const session = await ctx.db.session.findFirst({
                where: {
                    id: input.id
                }
            })
            if (session?.userName == null){
                await ctx.db.session.update({
                    data: {
                        userName: input.userName
                    },
                    where: {
                        id: input.id
                    }
                })
            }
        }),
    getById: publicProcedure
        .input(z.object({ sessionId: z.number() }))
        .query(async ({ input, ctx }) => {
            const testSession = await ctx.db.session.findFirst({
                where: {
                    id: input.sessionId
                }
            })
            return testSession
        }),
    getNewGame: publicProcedure
        .input(z.object({sessionId: z.number()}))
        .query(async ({ input, ctx }) => {
            const session = await ctx.db.session.findUnique({
                where: {
                    id: input.sessionId
                },
                select: {
                    completed_games: true
                }
            });
            if (session === null){
                return {
                    error: "Session not found"
                }
            }
            const completedGameNumbers = new Set(session.completed_games);
            const allNumbers = Array.from({ length: 12 }, (_, index) => index + 1);
            const availableNumbers = allNumbers.filter(num => !completedGameNumbers.has(num));
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const randomNumber = availableNumbers[randomIndex]!;
            completedGameNumbers.add(randomNumber);
            if ((Array.from(completedGameNumbers)).length > 4){
                return {
                    error: "Too many games"
                }
            }
            let gameActive = true;
            if ((Array.from(completedGameNumbers)).length == 4){
                gameActive = false;
            }
            await ctx.db.session.update({
                data: {
                    completed_games: Array.from(completedGameNumbers)
                },
                where: {
                    id: input.sessionId
                }
            })
            return {
                gameID: randomNumber,
                gameActive: gameActive
            }
        })
});
