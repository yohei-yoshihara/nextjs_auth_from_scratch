import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl text-gray-500 font-bold my-3">Top Page</div>
      <Link
        href="/dashboard"
        className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h5>
      </Link>
      <div>
        <p className="text-gray-400 text-sm mt-5">
          This is the public page. Any one can see this page.
        </p>
      </div>
    </div>
  );
}
