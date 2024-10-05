"use server";
import db from "@/app/lib/db";
import { User } from "@prisma/client";

export async function createUser(
  name: string,
  email: string,
  password: string,
  team: string,
  role: string
) {
  const user = await db.user.create({
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
  const user = await db.user.findUnique({
    where: {
      name: name,
    },
  });
  return user;
}
