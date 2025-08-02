'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
    return (
        <header className="bg-indigo-50 sticky top-0 z-50 shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">QueryVault</h1>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <Link href="#about" className="hover:text-indigo-600">About</Link>
          <Link href="#features" className="hover:text-indigo-600">Features</Link>
          <Link href="#contact" className="hover:text-indigo-600">Contact</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Dashboard</Link>
              <button
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Sign Out
            </button>
            </>
          ) : (
            <Link href="/signin" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Sign In</Link>
          )}
        </nav>
      </header>
    );
}