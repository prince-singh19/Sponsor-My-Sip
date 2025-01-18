'use client';
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Script from "next/script";
import {useEffect, useState} from "react";

export default function DonationForm({ email,toUser }: { email: string,toUser:string}) {
  const createOrder = async () => {
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: amount*5*100 ,name,message,toUser,email}),
    });
    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
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
          // do whatever page transition you want here as payment was successful
          alert("Payment successful");
        } else {
          alert("Payment failed");
        }
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };

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

  async function handleFormSubmit(formData: FormData) {
    formData.set('amount', amount.toString());
    formData.set('email', email);
  }
  



  return (
    <form action={handleFormSubmit} >
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {setAmount(1); setNumberInValue('1');}}
          className={"amount " + (amount === 1 ? 'active' : '')}>
          1
        </button>
        <button
          type="button"
          onClick={() => {setAmount(3); setNumberInValue('3');}}
          className={"amount " + (amount === 3 ? 'active' : '')}>
          3
        </button>
        <button
          type="button"
          onClick={() => {setAmount(5); setNumberInValue('5');}}
          className={"amount " + (amount === 5 ? 'active' : '')}>
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          type="number"
          placeholder="10"
          onChange={ev => setNumberInValue(ev.target.value)}
          value={numberInValue} />
      </div>
      <div className="mt-2">
        <input name="name" type="text" placeholder="Your name" onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="mt-2">
        <textarea name="message" id="" placeholder="Say something nice" onChange={(e)=>setMessage(e.target.value)}></textarea>
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
    e.preventDefault(); // Prevent form submission
    createOrder(); // Trigger Razorpay payment
  }}
>
  Support ${amount * 5}
</button>
      </div>
    </form>
  );
}