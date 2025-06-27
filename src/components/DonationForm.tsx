'use client';
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Script from "next/script";
import { useEffect, useState } from "react";

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: new (options: {
      key: string | undefined;
      order_id: string;
      handler: (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => void;
    }) => { open: () => void };
  }
}


export default function DonationForm({ email, toUser }: { email: string; toUser: string }) {
  const [numberInValue, setNumberInValue] = useState('');
  const [amount, setAmount] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);

  const createOrder = async () => {
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: amount * 5 * 100, name, message, toUser, email }),
    });
    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,
      handler: async function (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) {
        const res = await fetch("/api/verifyOrder", {
          method: "POST",
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.isOk) {
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },
    };

    const payment = new window.Razorpay(paymentData);
    payment.open();
  };

  async function handleFormSubmit(formData: FormData) {
    formData.set('amount', amount.toString());
    formData.set('email', email);
  }

  return (
    <form action={handleFormSubmit}>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        {[1, 3, 5].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => {
              setAmount(val);
              setNumberInValue(val.toString());
            }}
            className={`amount ${amount === val ? 'active' : ''}`}
          >
            {val}
          </button>
        ))}
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          type="number"
          placeholder="10"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberInValue(e.target.value)}
          value={numberInValue}
        />
      </div>

      <div className="mt-2">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <textarea
          name="message"
          placeholder="Say something nice"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <h3 className="text-xs text-gray-500 mb-1">Pay with selected with cc</h3>
      </div>

      <div className="mt-2">
        <Script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <button
          className="bg-yellow-300 w-full rounded-xl py-2 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            createOrder();
          }}
        >
          Support ₹{amount * 5}
        </button>
      </div>
    </form>
  );
}
