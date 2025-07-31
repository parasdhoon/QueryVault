import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header className="bg-indigo-50 sticky top-0 z-50 shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">QueryVault</h1>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <Link href="#about" className="hover:text-indigo-600">About</Link>
          <Link href="#features" className="hover:text-indigo-600">Features</Link>
          <Link href="#contact" className="hover:text-indigo-600">Contact</Link>
          {false ? (
            <Link href="/dashboard">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/signup">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </Link>
          )}
        </nav>
      </header>
    );
}