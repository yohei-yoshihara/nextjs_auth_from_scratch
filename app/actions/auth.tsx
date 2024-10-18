import {
  LoginFormSchema,
  SignupFormSchema,
  FormState,
} from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import db from "@/app/lib/db";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { createUser, getUserByName } from "../lib/dbutils";

export async function login(state: FormState, formData: FormData) {
  console.log(
    `login, name = ${formData.get("name")}, password=${formData.get(
      "password"
    )} `
  );
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log("failed to login, fields are invalid");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData = {
    name: formData.get("name") as string,
    password: formData.get("password") as string,
  };

  const user = await getUserByName(userData.name);
  console.log("user = ", user);

  if (!user) {
    console.log("failed to login, no user");
    return { message: "login error" };
  }

  if (!bcrypt.compare(userData.password, user.password)) {
    console.log("failed to login, incorrect password");
    return { message: "login error" };
  }

  console.log("createSession");
  await createSession(user.id, user.role);

  console.log("login success");
  redirect("/");
}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    team: formData.get("team"),
    role: formData.get("role"),
  };
  console.log("signup start, data = ", data);

  const validatedFields = SignupFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error(
      "failed to signup, validation failed, ",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password, team, role } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const user = await createUser(name, email, hashedPassword, team, role);

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // TODO:
  // 4. Create user session
  await createSession(user.id, role);

  console.log("signup finished");
  // 5. Redirect user
  redirect("/profile");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
