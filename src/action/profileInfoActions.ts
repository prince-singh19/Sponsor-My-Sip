'use server';

import { authoption } from "@/app/api/auth/[...nextauth]/route";
import {ProfileInfoModel} from "@/models/ProfileInfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function saveProfile(formData: FormData) {
  console.log("jkdjkf",formData);
  await mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authoption);

  console.log("server session ",session)
  if (!session) throw 'you need to be logged fffffff in';
  const email = session.user?.email;
 console.log(email);
  const {
    username, displayName, bio, coverUrl, avatarUrl,
  } = Object.fromEntries(formData);
  console.log(bio);
  console.log(displayName);
  const profileInfoDoc = await ProfileInfoModel.findOne({email});
  if (profileInfoDoc) {
    profileInfoDoc.set({username, displayName, bio, coverUrl, avatarUrl});
    await profileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({username, displayName, bio, email, coverUrl, avatarUrl});
  }

  return true;
}