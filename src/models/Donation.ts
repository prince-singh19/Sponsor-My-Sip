import {model, models, Schema} from "mongoose";

export type Donation = {
  amount: number;
  name: string;
  message?: string;
  paid: boolean;
  email: string;
};

const donationSchema = new Schema({
  amount: {type: Number, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  message: {type: String},
  paid: {type: Boolean, default: false},
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationSchema);