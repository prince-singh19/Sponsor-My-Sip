"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
      setLoading(false);
    };

    fetchSession();
  }, []);

  const handleButtonClick = () => {
    if (session) {
      router.push("/profile");
    } else {
      router.push("/profile");
    }
  };

  if (loading) {
    return <p className="text-center mt-16 animate-pulse">Checking your session...</p>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b  text-white flex items-center justify-center px-4">
      <div className="max-w-45 mx-auto text-center bg-white text-gray-800 rounded-lg shadow-2xl p-8">
        {/* Star Rating Section */}
        <div className="text-yellow-500 animate-bounce">
          <p>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </p>
          <p className="mt-2 text-gray-700">Join thousands of creators who trust us!</p>
        </div>

        {/* Headline Section */}
        <h1 className="text-6xl font-extrabold mt-6 text-blue-600">
          Turn Passion<br />
          into Support
        </h1>
        <h2 className="mt-4 mb-8 text-gray-600 text-lg">
          Share your creativity with the world<br />
          and get rewarded effortlessly.
        </h2>

        {/* About Project Section */}
        <div className="bg-gradient-to-r from-blue-100 via-teal-100 to-green-100 border border-blue-200 rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-blue-500 mb-2">What is Sponsor My Sip?</h3>
          <p className="text-gray-700">
          Sponsor My Sip (or similar platforms) empowers creators to monetize their work. 
            Accept small donations, engage with supporters, and turn your side hustle into a full-time career.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 font-bold rounded-full text-white hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          Start my page
        </button>
      </div>
    </section>
  );
}
