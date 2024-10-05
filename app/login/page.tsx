import { LoginForm } from "@/app/ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center ">
      <div className="text-2xl text-gray-500 font-bold my-3">Login</div>
      <LoginForm />
      <div className="m-2 p-2 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-400">
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}
