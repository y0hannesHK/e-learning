// app/auth/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const callbackUrl = searchParams.get('callbackUrl') || `/default`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      setError('invalid email or password');
    } else if (result?.url) {
      console.log('this is the url', result?.url);
      router.push(result.url);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          {/* Back link */}
          <Link
            href="/home"
            className="flex items-center text-sm text-gray-600 hover:text-black mb-2 w-fit"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>

          <CardTitle className="text-center text-2xl font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 text-center">Error: {error}</p>
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Sign In
            </Button>
            {/* Google Sign In */}
            <Button
              onClick={() => signIn('google', { callbackUrl })}
              variant="default"
              className="w-full mt-4 bg-gray-400 hover:bg-gray-500"
            >
              Sign in with Google
            </Button>
          </form>

          <Link href="/register" className="text-blue-600 hover:underline">
            Don’t have an account? Register here.
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
