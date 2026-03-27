"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function ProfileSetup() {
  const [bio, setBio] = useState("");
  const [bioWords, setBioWords] = useState(0);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBio(text);
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    setBioWords(words);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold mb-2">Complete Your Seller Profile</h1>
          <p className="text-indigo-100">Your profile remains INACTIVE until these requirements are met.</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Bio Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Professional Biography (Minimum 150 words)
            </label>
            <textarea 
              rows={6}
              value={bio}
              onChange={handleBioChange}
              className={`w-full p-4 rounded-xl border focus:ring-2 focus:outline-none transition-all text-gray-900 font-medium ${bioWords >= 150 ? 'border-green-200 focus:ring-green-500' : 'border-gray-200 focus:ring-indigo-500'}`}
              placeholder="Tell buyers about your educational background, expertise, and writing style..."
            />
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className={`${bioWords >= 150 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                {bioWords} / 150 words minimum
              </span>
              {bioWords >= 150 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </div>
          </div>

          {/* Handwriting Sample */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              High-Quality Handwriting Sample
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Buyers will use this sample to verify the quality and style of handwriting they will receive. Upload a clear, well-lit image of your natural handwriting.
            </p>
            
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-indigo-600" />
              </div>
              <span className="text-gray-600 font-medium">Click to upload or drag and drop</span>
              <span className="text-xs text-gray-400 mt-2">PNG, JPG up to 10MB</span>
            </div>
          </div>

          <button 
            disabled={bioWords < 150}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${bioWords >= 150 ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Activate Profile
          </button>
        </div>
      </div>
    </div>
  );
}
