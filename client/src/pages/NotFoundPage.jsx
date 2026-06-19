import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4">Page not found</p>

      <Link to="/" className="mt-6 text-blue-600">
        Back Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
