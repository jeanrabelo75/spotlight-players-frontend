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
      router.push("/");
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
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&rsquo;t have an account? <Link href="/register">Register here</Link>
        .
      </p>
    </div>
  );
};

export default Login;
