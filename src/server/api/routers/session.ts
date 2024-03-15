import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const sessionRouter = createTRPCRouter({
    create: publicProcedure
        .mutation(async ({ ctx }) => {
            const newSession = await ctx.db.session.create({})
            console.log(newSession)
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
            if (!session) {
                return new TRPCError({
                    code: "NOT_FOUND",
                    message: "Session with provided id was not found."
                })
            }
            if (!session.isActive) {
                return new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Session is not active"
                })
            }
            const updatedSession = await ctx.db.session.update({
                data: {
                    userName: input.userName,
                    isActive: false
                },
                where: {
                    id: input.id
                },
                select: {
                    userName: true
                }
            })
            return updatedSession
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
    getTop10: publicProcedure
        .query(async ({ ctx }) => {
            const topSessions = await ctx.db.session.findMany({
                take: 10,
                orderBy: {
                    totalScore: "desc"
                }
            })
            return topSessions
        }),
});
