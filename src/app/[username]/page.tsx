'use server';
import DonationForm from "@/components/DonationForm";
import {ProfileInfo, ProfileInfoModel} from "@/models/ProfileInfo";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
  params: {
    username: string;
  };
}

export default async function SingleProfilePage({params}:Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username});

  if (!profileInfoDoc) {
    return (
      <div>404 - profile not found</div>
    );
  }
  return (
    <div>
      <div className="w-full h-48">
        <Image
          src={profileInfoDoc.coverUrl}
          width={2048}
          height={2048}
          alt="cover image"
          className="object-cover object-center h-48"
        />
      </div>
      <div className="max-w-2xl px-2 mx-auto relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 overflow-hidden rounded-xl border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl}
              width={256}
              height={256}
              alt="cover image"
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">
              {profileInfoDoc.displayName}
            </h1>
            <h2 className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCoffee} />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            {profileInfoDoc.bio}
            <hr className="my-4"/>
            <h3 className="font-semibold mt-6">Recent supporters:</h3>
           <p>no recent donations</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm />
          </div>
        </div>

      </div>
    </div>
  );
}