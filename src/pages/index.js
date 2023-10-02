import Link from 'next/link';
import { useAuth } from '../contexts/auth.js';

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
            <a>Login</a>
          </Link>
          <br />
          <Link href="/register">
            <a>Register</a>
          </Link>
          <button onClick={login}>Login (Mock)</button>
        </>
      )}
    </div>
  );
};

export default Home;
