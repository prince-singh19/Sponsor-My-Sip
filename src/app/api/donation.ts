// File: pages/api/donation.ts

import { DonationModel } from "@/models/Donation";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB (Mongoose 6.x no longer requires 'useNewUrlParser' or 'useUnifiedTopology')
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI as string);
      }

      const { amount, name, message, email, paid } = req.body;

      // Create a new donation document
      const donationDoc = await DonationModel.create({
        amount,
        name,
        message,
        email,
        paid,
      });

      res.status(200).json({ success: true, donationDoc });
    } catch (error: unknown) {
      // Type assertion to make 'error' an instance of 'Error'
      if (error instanceof Error) {
        console.error("Error saving donation:", error.message);
        res.status(500).json({ success: false, error: error.message });
      } else {
        console.error("Unknown error:", error);
        res.status(500).json({ success: false, error: "Unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
