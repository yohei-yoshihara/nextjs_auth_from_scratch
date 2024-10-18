import { LoginForm } from "@/app/ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center ">
      <div className="text-2xl text-gray-500 font-bold my-3">Login</div>
      <LoginForm />
      <div className="border border-gray-500 p-3 rounded-xl mt-10">
        <h1 className="text-gray-500 text-xl mb-3">Test User</h1>
        <p>
          <span className="text-gray-600 mr-2">name:</span>
          <span>test1</span>
        </p>
        <p>
          <span className="text-gray-600 mr-2">password:</span>
          <span>test12345!</span>
        </p>
      </div>
      <div className="mt-10 m-2 p-2 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-400">
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}
