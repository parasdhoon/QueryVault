'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

export default function HomePage() {
  const isLoggedIn = false;

  return (
    <div className="min-h-screen flex flex-col bg-white text-indigo-900">
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-20 bg-white">
        <h2 className="text-4xl font-bold mb-4">Your Secure Vault for All AI Queries</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Store, manage, and revisit your AI-powered conversations across documents and history with ease.
        </p>
        <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
          <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 px-6 rounded-xl shadow-md">
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
          </button>
        </Link>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-indigo-50 py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose QueryVault?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: 'Secure & Private',
              desc: 'Your queries and documents are encrypted and stored safely.',
            },
            {
              title: 'Document-Linked Conversations',
              desc: 'Ask questions directly on your uploaded documents.',
            },
            {
              title: 'Smart History',
              desc: 'Track and revisit past AI queries with full context.',
            },
            {
              title: 'Blazing Fast',
              desc: 'Optimized backend and AI microservice for speed and scale.',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
