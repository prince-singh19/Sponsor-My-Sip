// components/SignInButton.tsx
'use client';
import { signIn } from 'next-auth/react';


export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Go to Login
    </button>
  );
   
  
}
