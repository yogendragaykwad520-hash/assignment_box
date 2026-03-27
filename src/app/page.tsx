import Link from "next/link";
import { Search, ShieldCheck, Clock, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Nail your assignments <br className="hidden md:block" />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">expert help.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10">
            Secure, fast, and high-quality assignment writing services by top-tier students and graduates. Escrow protected payments.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/gigs" className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300">
              Find a Writer
            </Link>
            <Link href="/register?role=seller" className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:bg-gray-50 transition-all duration-300">
              Become a Seller
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 -translate-y-12 left-1/2 -ml-96 -z-10 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 opacity-50 blur-3xl mix-blend-multiply"></div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose StudyMarket?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                <ShieldCheck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Escrow Payments</h3>
              <p className="text-gray-600">Your money is held safely until you approve the completed assignment. Zero risk.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">On-Time Delivery</h3>
              <p className="text-gray-600">Sellers set strict delivery limits. Get your assignments exactly when you need them.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">Dispute system available if the handwriting or quality doesn&apos;t match the seller&apos;s verified samples.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
