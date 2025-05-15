import React, { useState } from 'react';
import Link from 'next/link';

type RegisterResponse = {
  id: string;
  email: string;
  is_verified: boolean;
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(password)) {
      setErrorMsg(
        'Password must be at least 8 characters and include upper, lower, digit, special character.'
      );
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('You must accept Terms of Service and Privacy Policy.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://chemgpt-pro.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          accept_terms: acceptTerms,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.detail || 'Registration failed.');
      } else {
        const data: RegisterResponse = await response.json();
        setSuccessMsg(
          'Registration successful! Please check your email to verify your account.'
        );
        setEmail('');
        setPassword('');
        setAcceptTerms(false);
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Create your ChemGPT account
        </h1>
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{successMsg}</div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-2 rounded"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e.target.checked)}
              className="mr-2"
            />
            <span>
              I accept the{' '}
              <Link href="/terms" className="underline text-blue-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline text-blue-700">
                Privacy Policy
              </Link>
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded p-2 mt-4"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-700 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
