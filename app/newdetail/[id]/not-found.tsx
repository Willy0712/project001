import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">This new could not be found</h1>
      <Link
        href="/"
        className="inline-block  bg-primary-800 hover:bg-primary-700 rounded-full text-white px-6 py-3 text-lg"
      >
        Go back to home
      </Link>
    </main>
  );
}

export default NotFound;
