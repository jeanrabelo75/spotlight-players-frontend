import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { useSession, signOut } from "next-auth/react";

const AppLayout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  // Define o access token no cookie
  useEffect(() => {
    if (session?.user?.accessToken) {
      Cookies.set("access-token", session.user.accessToken);
    }
  }, [session]);

  // Função para fazer logout
  function userLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
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

        {/* Logout Button (Mobile) */}
        <nav className="md:hidden flex justify-center">
          <button
            onClick={userLogout}
            className="bg-white text-primary px-4 py-2 rounded mt-4"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
