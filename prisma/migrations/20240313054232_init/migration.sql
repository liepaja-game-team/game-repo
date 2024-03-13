-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(32) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);
