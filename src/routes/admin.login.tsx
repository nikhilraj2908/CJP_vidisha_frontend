import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { adminLogin } from "@/services/adminApi";

export const Route = createFileRoute('/admin/login')({
  component: AdminLogin,
});

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminLogin(username, password);
      navigate({ to: "/admin/issues" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="brutal-card bg-paper p-8 w-full max-w-md">
        <h1 className="font-display text-3xl mb-6">Admin Login</h1>
        {error && <div className="bg-alert text-paper p-2 mb-4 text-sm">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="border-[3px] border-ink bg-paper px-3 py-2 w-full mb-4 font-mono"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border-[3px] border-ink bg-paper px-3 py-2 w-full mb-6 font-mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="brutal-btn bg-saffron text-paper w-full py-3 text-center">
          Login
        </button>
      </form>
    </main>
  );
}