"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Star, Clock, User, DollarSign, Shield, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatToUSD } from "@/utils/currency";

export default function GigDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('gigs')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setGig(data);
        } else {
          // Check for mock data if not in Supabase
          const mockData: any = {
            "mock1": { title: "I will write professional computer science assignments", seller_name: "Alex D.", rating: 4.9, price_inr: 4, delivery_days: 2, description: "Expert Java/Python/C++ assignment help tailored for your university requirements." },
            "mock2": { title: "I will do complete research and write history essays", seller_name: "Sarah T.", rating: 4.8, price_inr: 3, delivery_days: 1, description: "In-depth historical research and analysis for essays and papers." },
            "mock3": { title: "I will write a high-quality literature review", seller_name: "Marcus W.", rating: 5.0, price_inr: 2, delivery_days: 3, description: "Comprehensive literature reviews with proper citations and academic tone." },
          };
          if (mockData[id as string]) {
            setGig({ id, ...mockData[id as string] });
          }
        }
      } catch (error) {
        console.error("Error fetching gig:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h1>
        <Link href="/gigs" className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/gigs" className="text-gray-500 hover:text-gray-900 font-medium inline-flex items-center gap-2 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> All Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {gig.title}
            </h1>
            
            <div className="flex items-center gap-4 py-4 border-y border-gray-100">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600">
                {gig.seller_name?.[0] || 'U'}
              </div>
              <div>
                <div className="font-bold text-gray-900">{gig.seller_name}</div>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-gray-900">{gig.rating || "5.0"}</span>
                  <span className="text-gray-400">• Top-tier Writer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl h-64 flex items-center justify-center">
            <span className="text-6xl px-4">📄</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this service</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {gig.description || "No detailed description provided."}
            </div>
          </div>
        </div>

        {/* Right Column: Order Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl sticky top-24">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">One-time Order</span>
                <div className="mt-2 text-3xl font-bold text-gray-900">{formatToUSD(gig.price_inr)}<span className="text-lg text-gray-400 font-normal">/page</span></div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">{gig.delivery_days} Days Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">Escrow Protected</span>
              </div>
            </div>

            <button 
              onClick={() => router.push(`/orders/checkout?gigId=${gig.id}`)}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-100 active:scale-95 mb-4"
            >
              Continue to Order
            </button>
            <p className="text-xs text-center text-gray-400">You won&apos;t be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
