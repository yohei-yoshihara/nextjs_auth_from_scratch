import { SignupForm } from "@/app/ui/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center ">
      <div className="text-2xl text-gray-500 font-bold my-3">Login</div>
      <SignupForm />
    </div>
  );
}
