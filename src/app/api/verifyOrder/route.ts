import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/database";
import { DonationModel } from "@/models/Donation";


const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_SECRET_ID as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

    // Probably some database calls here to update order or add premium status to user
    try {
        connectDB()
        await DonationModel.updateOne({ orderId }, {
            paid:true
        })

        return NextResponse.json(
            { message: "payment verified successfully", isOk: true },
            { status: 200 }
          );
        
    } catch (error) {
        console.error(error);
      return NextResponse.json({ isOk: false, error: "Failed to update database" },{status:500});
} 
}
