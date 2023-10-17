import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const AppHome = () => {
  const router = useRouter();
  const { data: session } = useSession();
  Cookies.set("access-token", session?.user?.accessToken);

  function userLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">Spotlight Players</div>
        <nav className="space-x-4 hidden md:flex">
          <button
            onClick={userLogout}
            className="bg-white text-primary px-4 py-2 rounded"
          >
            Logout
          </button>
        </nav>
        <div className="md:hidden">
          <button>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>

      <h1 className="text-4xl font-bold text-center mt-8">Welcome to My App</h1>
      <div className="text-center mt-4">
        {session ? (
          <>
            <p>You are logged in.</p>
            <Link href="/app/profile">
              <span className="text-primary">Profile</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className="text-primary">Login</span>
            </Link>
            <br />
            <Link href="/register">
              <span className="text-primary">Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AppHome;
