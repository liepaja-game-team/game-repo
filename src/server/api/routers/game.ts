import { TRPCError } from "@trpc/server";
import { z } from "zod";
import matter from 'gray-matter';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import getGameFileById from "../utils/getGameFileById";


export const gameRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ gameId: z.number() }))
        .query(async ({ ctx, input }) => {
            const game = await getGameFileById(input.gameId)
            if (!game) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Task with specified id was not found"
                })
            }
            const taskData = matter(game)
            return {
                content: taskData.content,
                answers: taskData.data["answers"],
                title: taskData.data["title"]
            }
        }),
    sendAnswer: publicProcedure
        .input(z.object({
            sessionId: z.number(),
            gameId: z.number(),
            answerIndex: z.number()
        }))
        .mutation(async ({ input, ctx }) => {
            const session = await ctx.db.session.findFirst({
                where: {
                    id: input.sessionId
                },
                select: {
                    scores: true
                }
            })

            const gameFile = await getGameFileById(input.gameId)
            const rightAnswerIndex = matter(gameFile).data["right_answer"]
            const score = rightAnswerIndex === input.answerIndex ? 200 : 0

            if (!session) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Session with provided id was not found."
                })
            }

            const updatedSession = await ctx.db.session.update({
                data: {
                    scores: [...session.scores, score]
                },
                where: {
                    id: input.sessionId
                }
            })
            return updatedSession.scores
        }),
    getNewGame: publicProcedure
        .input(z.object({ sessionId: z.number() }))
        .query(async ({ input, ctx }) => {
            const session = await ctx.db.session.findUnique({
                where: {
                    id: input.sessionId
                },
                select: {
                    completed_games: true
                }
            });
            if (session === null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Session with provided id was not found"
                })
            }
            if (session.completed_games.length >= 4) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "This session already has max amount played games"
                })
            }

            const completedGameNumbers = new Set(session.completed_games);
            const allNumbers = Array.from({ length: 12 }, (_, index) => index + 1);
            const availableNumbers = allNumbers.filter(num => !completedGameNumbers.has(num));
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const randomNumber = availableNumbers[randomIndex]!;
            completedGameNumbers.add(randomNumber);

            let isLast = false;
            if ((Array.from(completedGameNumbers)).length == 4) {
                isLast = true;
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
                isLast: isLast
            }
        })
});
