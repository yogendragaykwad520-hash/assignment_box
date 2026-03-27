"use client";

import { useEffect, useState } from "react";
import { CopyX, CheckCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function OrdersDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else if (!loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Combined mock and real data for demonstration if no real orders exist
  const displayOrders = orders.length > 0 ? orders : [];

  if (!user && !loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Orders Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your assignments, payments, and disputes.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button onClick={() => setActiveTab("active")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'active' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
          <button onClick={() => setActiveTab("completed")} className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'completed' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Completed</button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading your orders...</p>
        </div>
      ) : displayOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <button onClick={() => router.push("/gigs")} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold">Browse Services</button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayOrders.filter(o => activeTab === 'active' ? o.status !== 'completed' : o.status === 'completed').map(order => (
            <div key={order.id} className="bg-white border text-left border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-indigo-50 text-indigo-700 font-mono text-xs px-3 py-1 rounded-full">#{order.id.slice(0, 8)}</span>
                  <span className={`text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider
                    ${order.status === 'pending_escrow' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {order.status?.replace("_", " ")}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{order.gig_title}</h2>
                <div className="text-gray-500 mt-1 flex items-center gap-4 text-sm">
                  <span>By: {order.seller_name}</span>
                  <span>•</span>
                  <span>{order.pages} pages</span>
                </div>
              </div>

              <div className="flex flex-col md:items-end w-full md:w-auto mt-4 md:mt-0">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full md:w-64">
                  <div className="flex justify-between text-sm mb-2 text-gray-500">
                    <span>Total Paid (Escrow)</span>
                    <span className="font-semibold text-gray-900">${order.total_price?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-indigo-600 font-medium">
                    <span>Seller Payout (90%)</span>
                    <span>${(order.total_price * 0.9).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 w-full justify-end">
                  {order.status === 'pending_escrow' && (
                    <>
                      <button className="px-5 py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
                        <CopyX className="w-4 h-4" /> Dispute
                      </button>
                      <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Mark Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
