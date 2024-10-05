"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/actions/auth";

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form className="w-full max-w-lg border shadow-xl p-2 m-2" action={action}>
      <div className="flex items-center m-3">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right pr-4"
            htmlFor="name">
            Name
          </label>
        </div>
        <div className="w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="name"
            name="name"
            placeholder="Name"
          />
        </div>
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <div className="flex items-center m-3">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right pr-4"
            htmlFor="email">
            Email
          </label>
        </div>
        <div className="w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div className="flex items-center m-3">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right pr-4"
            htmlFor="password">
            Password
          </label>
        </div>
        <div className="w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="password"
            name="password"
            type="password"
          />
        </div>
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Team */}
      <div className="flex items-center m-3">
        <div className="w-1/3">
          <label
            className="block text-gray-500 font-bold text-right pr-4"
            htmlFor="team">
            Team
          </label>
        </div>
        <div className="w-2/3">
          <select
            className=" text-gray-500 font-bold px-4 my-4"
            name="team"
            id="team">
            <option value="sales-a">Sales-A</option>
            <option value="sales-b">Sales-B</option>
            <option value="dev-a">Dev-A</option>
            <option value="dev-b">Dev-B</option>
          </select>
        </div>
      </div>
      {state?.errors?.team && <p>{state.errors.team}</p>}

      {/* Role */}
      <div className="flex items-center m-3">
        <div className="w-1/3">
          <legend className="block text-gray-500 font-bold text-right pr-4">
            Role
          </legend>
        </div>

        <div className="w-2/3">
          <div className="px-4 my-4">
            <input
              className="mr-2"
              type="radio"
              id="role-user"
              name="role"
              value="user"
              checked
            />
            <label className="text-gray-500 font-bold pr-4" htmlFor="role-user">
              User
            </label>

            <input
              className="mr-2"
              type="radio"
              id="role-admin"
              name="role"
              value="admin"
            />
            <label className="text-gray-500 font-bold" htmlFor="role-admin">
              Admin
            </label>
          </div>
        </div>
      </div>
      {state?.errors?.role && <p>{state.errors.role}</p>}

      {/* Submit button */}
      <div className="flex items-center m-3">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl px-4 py-2 m-2"
      disabled={pending}
      type="submit">
      Sign Up
    </button>
  );
}
