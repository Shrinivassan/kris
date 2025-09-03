import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      console.log("Login response:", data);

      setMessage({ type: "success", text: "Login successful ✅" });

      // navigate to dashboard after short delay (for UX)
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-green-800 p-3 rounded-full">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold mt-4">MAMS Login</h1>
        <p className="text-gray-400">Military Asset Management System</p>
      </div>

      {/* Card */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Secure Access</h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter your credentials to access the system
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Messages */}
          {message.text && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Actions */}
          <span className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-green-500 cursor-pointer hover:underline"
            >
              Register Here
            </button>
          </span>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-green-700 hover:bg-green-800 transition disabled:opacity-50"
          >
            <Lock className="h-4 w-4" />
            {loading ? "Accessing..." : "Access System"}
          </button>
        </form>

        <hr className="my-6 border-gray-700" />

        {/* Demo creds */}
        <div className="text-sm text-gray-400">
          <p>Demo Credentials:</p>
          <p>
            <span className="text-green-400">admin / admin123</span> (Full Access)
          </p>
          <p>
            <span className="text-green-400">operator / operator123</span> (Operations)
          </p>
          <p>
            <span className="text-green-400">viewer / viewer123</span> (Read-Only)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
