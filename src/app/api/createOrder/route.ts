import { connectDB } from "@/lib/database";
import { DonationModel } from "@/models/Donation";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export async function POST(req: Request) {
    try {
      await connectDB();
      const { amount, name, message, email, toUser } = await req.json();
      console.log("this is the amount  ",amount,name,message,toUser)
      
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
  
      console.log("order : ",order)
           await DonationModel.create({
          amount,
          name,
          message,
          email,
          toUser,
          orderId: order.id,
      });
      
      console.log(amount, name, message, email, toUser)
  
    return NextResponse.json(order);
    
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
      return NextResponse.json({ error: "Internal Server Error" })
  }
  }
  