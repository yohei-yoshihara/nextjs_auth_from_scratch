"use server";
import { prisma } from "@/lib/prisma";

export async function createUser(
  name: string,
  email: string,
  password: string,
  team: string,
  role: string
) {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
      team: team,
      role: role,
    },
  });
  return user;
}

export async function getUserByName(name: string) {
  console.log(`getUser name=${name}`);
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  return user;
}
