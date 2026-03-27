import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">StudyMarket</span>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              The premier marketplace for students to hire top-tier academic writers and tutors securely.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Essays</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Research Papers</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Programming</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Help & Support</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Trust & Safety</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Selling on StudyMarket</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-indigo-600">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} StudyMarket Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
