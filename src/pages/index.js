import Link from "next/link";
import { useAuth } from "@/contexts/auth";

const Home = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to My App</h1>
      {isLoggedIn ? (
        <>
          <p>You are logged in.</p>
          <button onClick={logout}>Logout</button>
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
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
