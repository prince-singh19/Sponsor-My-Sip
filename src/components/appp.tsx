import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Importing Image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type ProfileType = {
  _id: string;
  email: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
};

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProfileType[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(async () => {
        if (!value) {
          setResults([]);
          return;
        }
        setLoading(true);
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
          const data = await response.json();
          setResults(data.profiles);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      }, 300)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setQuery("");
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-16 w-96 relative" ref={searchBarRef}>
      <div className="absolute w-full top-3">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder="Search creator"
            value={query}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white rounded-full border-2 border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 shadow-md"
            aria-label="Search creator"
          />
          <button className="absolute right-4 top-2 text-gray-600 focus:outline-none" aria-label="Search button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {loading && <div className="absolute mt-4 text-gray-500">Loading...</div>}

      {results.length > 0 && (
        <div className="absolute mt-14 w-full max-w-md bg-white p-4 rounded-lg shadow-md z-50">
          <h3 className="font-bold text-gray-700 mb-2">Search Results:</h3>
          <ul>
            {results.map((result) => (
              <li key={result._id} className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                <Link
                  href={`/${result.username}`}
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                  className="flex items-center"
                >
                  <Image
                    src={result.avatarUrl || "/default-avatar.png"} // Fallback to default avatar
                    alt={`${result.username}'s avatar`} // Corrected template literal
                    className="w-8 h-8 rounded-full object-cover"
                    width={36}
                    height={36}
                  />
                  <span className="text-gray-800 font-medium pl-2">{result.username}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="absolute mt-14 w-full max-w-md bg-white p-4 rounded-lg shadow-md z-50">
          <p className="text-gray-600 truncate">No results found for {query}.</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
