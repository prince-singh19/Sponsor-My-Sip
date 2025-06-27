'use server';
import DonationForm from "@/components/DonationForm";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function SingleProfilePage({ params }: PageProps) {
  const { username } = params;

  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({ username });

  if (!profileInfoDoc) {
    return <div>404 - Profile not found</div>;
  }

  const donations: Donation[] = await DonationModel.find({
    paid: true,
    email: profileInfoDoc.email,
  }).sort({ amount: -1 });

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
              alt="avatar"
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">{profileInfoDoc.displayName}</h1>
            <h2 className="flex gap-1 items-center text-gray-600">
              <FontAwesomeIcon icon={faCoffee} />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">About {profileInfoDoc.username}</h3>
            <p className="text-gray-600">{profileInfoDoc.bio}</p>

            <hr className="my-4" />

            <h3 className="font-semibold text-gray-700 mb-2">Recent Supporters:</h3>
            {!donations.length ? (
              <p className="text-gray-500">No recent donations</p>
            ) : (
              <div className="mt-2 overflow-y-auto max-h-48 space-y-4">
                {donations.map((donation) => (
                  <div key={donation.orderId} className="py-2">
                    <h3>
                      <span className="font-semibold">{donation.name}</span>{" "}
                      <span className="text-gray-500">
                        bought you {donation.amount > 1 ? donation.amount / 100 + " chai" : "a chai"}
                      </span>
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">{donation.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm email={profileInfoDoc.email} toUser={profileInfoDoc.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
