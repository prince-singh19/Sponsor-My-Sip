'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
    console.log({ name, email, message });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex justify-center items-center py-12">
      <div className="max-w-[75vw] w-full bg-white p-8 shadow-xl rounded-lg space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Contact Us</h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          We would love to hear from you! Please fill out the form below or contact us directly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Write your message"
              rows={6}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          <p>Or you can reach us directly:</p>
          <div className="flex justify-center gap-8 mt-4">
            <a href="mailto:contact@buymeachai.com" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
              <span>Email</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-2xl" />
              <span>Phone</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
