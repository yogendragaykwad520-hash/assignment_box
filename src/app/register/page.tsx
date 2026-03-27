"use client";

import { useState } from "react";
import { User, Mail, Lock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "taken" | "available">("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const checkUsername = async (value: string) => {
    setUsername(value);
    if (value.length < 3) {
      setStatus("idle");
      return;
    }
    
    setStatus("checking");
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', value.toLowerCase())
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setStatus("taken");
      } else {
        setStatus("available");
      }
    } catch (err) {
      console.error("Username check error:", err);
      setStatus("available"); // Fallback
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Google registration failed.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== "available") {
      setError("Please choose a valid/available username.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create profile in 'profiles' table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user.id, 
              username, 
              email, 
              role: 'buyer' 
            }
          ]);

        if (profileError) throw profileError;
      }

      setSuccess(true);
      setTimeout(() => router.push("/"), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join StudyMarket</h1>
          <p className="text-gray-500">The premier assignment marketplace</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-2xl border border-green-100 text-center">
            Account created! Please check your email to verify your account. Redirecting shortly...
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-gray-900 pl-1">Unique Username</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-indigo-600">
                <User className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => checkUsername(e.target.value)}
                className={`block w-full pl-10 pr-10 py-3.5 bg-gray-50 border rounded-2xl focus:ring-2 focus:bg-white transition-all text-sm text-gray-900 font-medium
                  ${status === 'taken' ? 'border-red-500 focus:ring-red-100' : 
                    status === 'available' ? 'border-green-500 focus:ring-green-100' : 'border-gray-200 focus:ring-indigo-100'}`}
                placeholder="your_unique_id"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {status === 'checking' && <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />}
                {status === 'available' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {status === 'taken' && <XCircle className="h-5 w-5 text-red-500" />}
              </span>
            </div>
            {status === 'taken' && <p className="text-xs text-red-500 mt-1 pl-1">Username already taken.</p>}
            {status === 'available' && <p className="text-xs text-green-600 mt-1 pl-1">Username is available!</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 pl-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400">Or continue with</span>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Sign Up with Google
        </button>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}
