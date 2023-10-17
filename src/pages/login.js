import Link from "next/link";
import { useRouter } from "next/router";
import { MessageContext } from "@/contexts/message";
import { signIn, useSession } from "next-auth/react";
import React, { useState, useContext, useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const showMessage = useContext(MessageContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (session) {
      router.push("/app/");
    }
  }, [session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      if (result.status === 401) {
        showMessage("error", "Invalid email or password.");
      } else {
        showMessage("error", result.error);
      }
    } else {
      showMessage("success", "Login successful!");
      router.push("/app/");
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">Your Startup</div>
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

      {/* Login Form */}
      <div className="mt-8 mx-auto max-w-md p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="text-blue-500">Register here</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
