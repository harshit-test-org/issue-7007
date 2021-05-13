import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

async function main() {
  const prisma = new PrismaClient();

  const speaker = await prisma.speaker.create({
    data: {
      description: "test",
      excerpt: "test",
      name: "test",
      photo: crypto.randomBytes(10).toString("hex"),
      thumb: crypto.randomBytes(10).toString("hex"),
    },
  });

  const talk = await prisma.talk.create({
    data: {
      description: "test",
      date: new Date(),
      name: "test",
      place: "test",
      thumb: crypto.randomBytes(10).toString("hex"),
      speakers: {
        connect: {
          id: speaker.id,
        },
      },
    },
  });

  const data = await prisma.talk.findMany({
    orderBy: {
      date: "asc",
    },
    include: {
      speakers: true,
    },
  });

  console.log("speaker", speaker);
  console.log("talk", talk);
  console.log("data", data);
}

main();
