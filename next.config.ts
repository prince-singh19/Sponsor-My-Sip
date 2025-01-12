import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google OAuth images or any required domain
      'yeuuwurfoghsyouyvnut.supabase.co', // Supabase domain for your images
    ],
  },
};

export default nextConfig;
