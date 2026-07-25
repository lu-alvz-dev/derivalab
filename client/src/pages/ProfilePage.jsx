import { useState } from "react";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  const [showTeacherId, setShowTeacherId] = useState(false);

  const isDemoAccount = user.email.startsWith("demo.");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              User Profile
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Review your account information and classroom details.
            </p>
          </header>

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              p-8
            "
          >
            <div className="flex items-center gap-5">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  text-3xl
                "
              >
                {user.role === "teacher" ? "👨‍🏫" : "👨‍🎓"}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {user.role === "teacher"
                    ? "Teacher Account"
                    : "Student Account"}
                </h2>

                <p className="text-slate-500">
                  Your personal account information.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >
                <p className="text-sm font-medium text-slate-500">
                  Email Address
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-900 break-all">
                  {user.email}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >
                <p className="text-sm font-medium text-slate-500">Role</p>

                <p className="mt-2 text-lg font-semibold capitalize text-slate-900">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Registered Teacher */}

            {user.role === "teacher" && !isDemoAccount && (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-blue-200
                  bg-blue-50
                  p-5
                "
              >
                <p className="text-sm font-medium text-blue-700">Teacher ID</p>

                <p className="mt-2 text-3xl font-bold tracking-wide text-blue-600">
                  {user.id}
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  Share this ID with your students so they can register under
                  your classroom.
                </p>
              </div>
            )}

            {/* Registered Student */}

            {user.role === "student" && !isDemoAccount && (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >
                <button
                  onClick={() => setShowTeacherId(!showTeacherId)}
                  className="
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
                    text-white
                    font-medium
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    hover:shadow-md
                  "
                >
                  {showTeacherId ? "Hide My Teacher ID" : "Show My Teacher ID"}
                </button>

                {showTeacherId && (
                  <div className="mt-5">
                    <p className="text-sm font-medium text-slate-500">
                      Your Teacher ID
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-wide text-blue-600">
                      {user.teacher_id}
                    </p>

                    <p className="mt-3 text-sm text-slate-600">
                      This is the teacher associated with your account.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Demo Account */}

            {isDemoAccount && (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-amber-200
                  bg-amber-50
                  p-5
                "
              >
                <p className="font-semibold text-amber-800">Demo Account</p>

                <p className="mt-2 text-sm leading-6 text-amber-700">
                  This profile is part of the interactive demonstration. Teacher
                  IDs are intentionally hidden for demo users.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
