'use server';

import ProfileInfoForm from "@/components/ProfileInfoForm";
import { getServerSession } from "next-auth";
import { authoption } from "../api/auth/[...nextauth]/route";
import mongoose from "mongoose";

import { ProfileInfoModel } from "@/models/ProfileInfo";


export default async function ProfilePage(){
    const session = await getServerSession(authoption);
    if(!session || !session.user?.email){
        return 'not logged in'
    }
    const email = session.user.email;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileInfoDoc = JSON.parse(JSON.stringify(
        await ProfileInfoModel.findOne({email})
    ));
    return(
       <div>
        <ProfileInfoForm profileInfo={profileInfoDoc} />
        
       </div>
    );
};