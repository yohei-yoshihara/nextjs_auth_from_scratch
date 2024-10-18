"use server";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import db from "@/app/lib/db";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  console.log(`decrypt session=<${session}>`);
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // console.error("error = ", error);
    console.log("Failed to verify session");
  }
}

// export async function createSession(userId: string) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   const session = await encrypt({ userId, expiresAt });

//   cookies().set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

export async function createSession(id: number, role: string) {
  console.log(`createSession, id = ${id}, role = ${role}`);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1. Create a session in the database
  const s = await db.session.create({
    data: {
      userId: id,
      expiresAt: expiresAt.toISOString(),
    },
  });

  const sessionId = s.id;

  // 2. Encrypt the session ID
  const session = await encrypt({ sessionId, userId: id, role, expiresAt });

  // 3. Store the session in cookies for optimistic auth checks
  cookies().set("session", session, {
    httpOnly: true,
    secure: false, // this must be true if running on a production
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  console.log("createSession finished");
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
