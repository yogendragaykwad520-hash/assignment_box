"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Star, Clock, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { formatToUSD } from "@/utils/currency";

export default function GigsPage() {
  const { user } = useAuth();
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const { data, error } = await supabase
          .from('gigs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setGigs(data || []);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  // Show mock data only if there are no real gigs
  const displayGigs = gigs.length > 0 ? gigs : [
    { id: "mock1", title: "I will write professional computer science assignments", seller_name: "Alex D.", rating: 4.9, price_inr: 4, delivery_days: 2 },
    { id: "mock2", title: "I will do complete research and write history essays", seller_name: "Sarah T.", rating: 4.8, price_inr: 3, delivery_days: 1 },
    { id: "mock3", title: "I will write a high-quality literature review", seller_name: "Marcus W.", rating: 5.0, price_inr: 2, delivery_days: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Services</h1>
          <p className="text-gray-500">Find the best assignment help for your needs</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <input 
              type="text" 
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          {user && (
            <Link href="/gigs/create" className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg shadow-indigo-100 transition-all flex items-center justify-center group" title="Create a Gig">
              <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading assignments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayGigs.map((gig) => (
            <Link href={`/gigs/${gig.id}`} key={gig.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-50 group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-center">
                <span className="text-3xl">📄</span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600">
                    {gig.seller_name?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{gig.seller_name}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-4 line-clamp-2 hover:text-indigo-600">
                  {gig.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-gray-900">{gig.rating || "NEW"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Starting at</span>
                    <div className="text-lg font-bold text-gray-900">{formatToUSD(gig.price_inr)}<span className="text-sm text-gray-500 font-normal"> / page</span></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
