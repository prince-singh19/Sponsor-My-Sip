'use client';

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"; // Import the Image component
import { parseFullName } from "parse-full-name";

export default function Header() {
  const { data: session } = useSession();

  // Extract first name and user image
  const name = session?.user?.name || '';
  const { first: firstName } = parseFullName(name);

  return (
    <>
      <header className="bg-white">
        <div className="flex justify-between max-w-2xl mx-auto px-4 py-4">
          <Link href={'/'} className="inline-flex gap-1 items-center">
            <FontAwesomeIcon className="h-8" icon={faMugHot} />
            <span className="mt-2">Buy me a coffee</span>
          </Link>
          <nav className="mt-2 flex gap-6 items-center">
            <Link href="/about">About</Link>
            <Link href="/about">FAQ</Link>
            <Link href="/about">Contact</Link>
            <div className="flex gap-4">
              {session ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={"/profile"}
                    className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-4"
                  >
                    <Image
                      src={session.user?.image as string}
                      alt="avatar"
                      width="36"
                      height="36"
                      className="rounded-full"
                    />
                    {firstName}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-yellow-300 border-2 rounded-full px-4 py-2 ml-4"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => signIn('google')}
                    className="border-2 rounded-full px-4 py-2 ml-4"
                  >
                    Login
                  </button>
                  <button className="bg-yellow-300 rounded-full px-4 py-2">
                    Sign up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
