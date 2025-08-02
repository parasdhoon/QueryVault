'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
    type: 'signup' | 'signin';
};

export default function AuthForm({ type }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (type === 'signup') {
                const res = await fetch(`http://localhost:3000/api/users/signup`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name }),
                    headers: { 'Content-Type': 'application/json' }
                });

                alert(res.status);
                
                if (!res.ok) throw new Error('Signup failed' + res.status);
                
                await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                router.push('/');
            } else {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    alert("Invalid credentials");
                } else {
                    router.push('/');
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('Authentication failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
                    {type === 'signup' ? 'Create an Account' : 'Welcome Back'}
                </h2>

                {type === 'signup' && (
                    <input
                        className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="email"
                    placeholder="abc@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="mb-4 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all"
                >
                    {type === 'signup' ? 'Sign Up' : 'Sign In'}
                </button>

                <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
                    {type === 'signin' ? (
                        <>
                            <p>
                                Don’t have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => router.push('/signup')}
                                    className="text-indigo-600 hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                            <p>
                                <button
                                    type="button"
                                    onClick={() => router.push('/forgot-password')}
                                    className="text-indigo-500 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </p>
                        </>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/signin')}
                                className="text-indigo-600 hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}