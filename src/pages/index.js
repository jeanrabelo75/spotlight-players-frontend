import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  function userLogout(){
    signOut({ redirect: false }).then(() => {
			router.push("/");
		});
  }

  return (
    <div>
      <h1>Welcome to My App</h1>
      {session ? (
        <>
          <p>You are logged in.</p>
          <button onClick={userLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <span>Login</span>
          </Link>
          <br />
          <Link href="/register">
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
