"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot} from "@fortawesome/free-solid-svg-icons";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image"; // Import the Image component
import { parseFullName } from "parse-full-name";


import SearchBar from "./appp";

export default function Header() {
  const { data: session } = useSession();
  
 
  // Extract first name and user image
  const name = session?.user?.name || '';
  const { first: firstName } = parseFullName(name);

  return (
    <>
      <header className="bg-gradient-to-r bg-white shadow-lg sticky top-0 z-50">
        <div className="flex justify-between max-w-screen-xl mx-auto px-8 py-6">
          <Link href={'/'} className="inline-flex gap-3 items-center group">
            <FontAwesomeIcon
              className="h-10 text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
              icon={faMugHot}
            />
            <span className="text-gray-900 font-semibold text-2xl group-hover:text-gray-700 transition-colors duration-300">
            Sponsor My Sip
            </span>
          </Link>
          <nav className="mt-2 flex gap-10 items-center">
            {["About", "FAQ", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-800 font-medium hover:text-gray-700 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            <div className="flex gap-6 items-center">
              {session ? (
                <div className="flex items-center gap-4 bg-yellow-300 border border-gray-300 rounded-full p-2 pr-4 animate-fade-in">
                  <Link href={"/profile"} className="flex items-center gap-3">
                    <Image
                      src={session.user?.image as string}
                      alt="avatar"
                      width="42"
                      height="42"
                      className="rounded-full border-2 border-gray-300 shadow-lg"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium text-sm truncate w-28">
                        {firstName}
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-full px-5 py-2 transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>
           <div>
            <SearchBar/>
           </div>
          </nav>
        </div>
      </header>
    </>
  );
}
