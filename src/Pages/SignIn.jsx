import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
// import search from "../assets/images/search.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    // if (password.length < 6) return 'Password must be at least 6 characters'
    return "";
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // Replace with real auth call
      // await new Promise((res) => setTimeout(res, 800))
      const { data } = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true },
      );
      setUser(data);
      // On success navigate to home
      navigate("/");
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <main className="w-full flex justify-center px-4 py-12">
        <div className="w-lg max-w-md border border-gray-200 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            Sign in to your account
          </h2>
          <p className="mb-4 text-gray-600">
            Welcome back - please enter your details.
          </p>

          {error && (
            <div className="mb-3 text-red-600 text-sm font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-sm font-medium mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label>

            <label className="block mb-2 mt-4">
              <span className="text-sm font-medium mb-1 block">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-pink-500"
                >
                  {showPassword ? "Hide" : "Show"}
                  {/* <img src={search} className="h-5 w-5" alt="" /> */}
                </button>
              </div>
            </label>

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-pink-500 cursor-pointer "
                />{" "}
                <span>Remember me</span>
              </label>
              <Link
                to="/signin"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-6 w-full py-2 px-4 cursor-pointer bg-pink-500 text-white font-semibold rounded-md transition-colors ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-600"}`}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-pink-600 hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
