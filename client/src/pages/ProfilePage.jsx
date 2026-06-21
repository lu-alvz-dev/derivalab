import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">User Profile</h1>

        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mt-2">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
