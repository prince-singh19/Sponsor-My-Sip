import {model, models, Schema} from "mongoose";

export type Donation = {
  amount: number;
  name: string;
  message?: string;
  paid: boolean;
  email: string;
  orderId:string;
  toUser:string;
};

const donationSchema = new Schema({
    orderId : { type: String, required: true },
  amount: {type: Number, required: true},
    name: { type: String, required: true },
  toUser:{type:String , required:true},
  email: {type: String, required: true},
  message: {type: String},
  paid: {type: Boolean, default: false},
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationSchema);