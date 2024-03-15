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
            if (session?.userName == null) {
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
});
