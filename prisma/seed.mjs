import { PrismaClient } from "../app/generated/prisma/index.js"
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function generateHashedPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function main() {
  await db.user.deleteMany();

  await db.user.create({
    data: {
      name: "test1",
      email: "test1@example.com",
      password: await generateHashedPassword("test12345!"),
      team: "dev-a",
      role: "admin",
    },
  });
}

main();
