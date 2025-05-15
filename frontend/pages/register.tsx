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

    // Password complexity check (frontend, also checked by backend)
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
