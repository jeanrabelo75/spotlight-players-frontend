import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { MessageContext } from "@/contexts/message";

const Login = () => {
  const router = useRouter();
  const showMessage = useContext(MessageContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.API_URL + "login",
        formData
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      showMessage('success', 'Login successful!');
      router.push("/");
      console.log("Login successful!", response.data);
    } catch (error) {
      showMessage('error', 'Error logging in. Please try again!');
      console.error("Error logging in:", error);
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
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default Login;
