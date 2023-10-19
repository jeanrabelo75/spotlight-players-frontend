import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useSession, signOut } from "next-auth/react";

const AppLayout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.user?.accessToken) {
      Cookies.set("access-token", session.user.accessToken);
    }
  }, [session]);

  function userLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  }

  return (
    <div>
      <Header userLogout={userLogout}/>
      <Sidebar />
      
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
