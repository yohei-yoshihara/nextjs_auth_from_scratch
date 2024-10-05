import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import db from "@/app/lib/db";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  session.userId;

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.user.findMany({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        team: true,
        role: true,
      },
    });
    if (!data) {
      return null;
    }

    const user = data[0];

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
