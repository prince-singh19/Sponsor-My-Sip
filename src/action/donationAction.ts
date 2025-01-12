import { DonationModel } from "@/models/Donation";
import mongoose from "mongoose";

export async function createDonation(formData: FormData):Promise<string>{
    const {amount, name, message, crypto, email} = Object.fromEntries(formData);
    await mongoose.connect(process.env.MONGODB_URI as string);
    const donationDoc = await DonationModel.create({
        amount, name, message, crypto, email,
      });
    return ''
}