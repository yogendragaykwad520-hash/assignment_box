"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Plus, DollarSign, Clock, FileText } from "lucide-react";

export default function CreateGigPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerPage: "",
    deliveryLimit: "48h",
    category: "General",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to create a gig.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from('gigs')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price_inr: Number(formData.pricePerPage),
            category: formData.category,
            delivery_days: parseInt(formData.deliveryLimit) || 2, // Default to 2 days
            seller_id: user.id,
            seller_name: user.user_metadata?.username || user.email?.split('@')[0],
          }
        ]);

      if (insertError) throw insertError;
      
      router.push("/gigs");
    } catch (err: any) {
      setError(err.message || "Failed to create gig.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 mb-4">Please log in to create a gig.</p>
        <button onClick={() => router.push("/login")} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold">Log In</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Gig</h1>
          <p className="text-gray-500">Offer your assignment writing services to students</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 pl-1">Gig Title</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="block w-full pl-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
                placeholder="I will write professional computer science assignments"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 pl-1">Description</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
              placeholder="Describe your service in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 pl-1">Price Per Page (₹)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold">₹</span>
                </span>
                <input 
                  type="number" 
                  required
                  value={formData.pricePerPage}
                  onChange={(e) => setFormData({...formData, pricePerPage: e.target.value})}
                  className="block w-full pl-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
                  placeholder="2-4"
                />
              </div>
              {formData.pricePerPage && (
                <p className="text-xs text-gray-500 pl-1">
                  Approx. {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(formData.pricePerPage) * 0.012)} USD
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 pl-1">Delivery Time (e.g. 48h)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </span>
                <input 
                  type="text" 
                  required
                  value={formData.deliveryLimit}
                  onChange={(e) => setFormData({...formData, deliveryLimit: e.target.value})}
                  className="block w-full pl-10 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all text-sm text-gray-900 font-medium"
                  placeholder="48h"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Creating Gig..." : "Post Gig"}
          </button>
        </form>
      </div>
    </div>
  );
}
