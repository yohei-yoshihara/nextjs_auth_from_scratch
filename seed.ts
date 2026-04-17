import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

async function generateHashedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
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
