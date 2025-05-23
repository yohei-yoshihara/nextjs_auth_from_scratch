"use client";
import { FormState } from "@/app/lib/definitions";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";

const initialState: FormState = {};

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, initialState);

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
            defaultValue="test1"
          />
        </div>
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}

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
            defaultValue="test12345!"
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

      {/* Submit button */}
      <div className="flex items-center m-3">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <SubmitButton pending={isPending}/>
        </div>
      </div>
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl px-4 py-2 m-2"
      disabled={pending}
      type="submit">
      Sign in
    </button>
  );
}
