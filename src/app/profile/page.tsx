'use server';
import ProfileInfoForm from "@/components/ProfileInfoForm";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authoption } from "../api/auth/[...nextauth]/route";
import SignInButton from "@/components/SignInButton";

export default async function ProfilePage() {
  const session = await getServerSession(authoption);
  if (!session || !session.user?.email) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br ">
        <div className="bg-white border border-red-400 text-red-600 rounded-lg p-8 max-w-md text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-lg mb-6">
            You are not logged in. Please log in to access your profile.
          </p>
          <SignInButton />
        </div>
      </div>
    );
  }

  const email = session.user.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(
    JSON.stringify(await ProfileInfoModel.findOne({ email }))
  );

  const donations: Donation[] = await DonationModel.find({ paid: true, email });
  const total = donations.reduce((current, d) => current + d.amount, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 mt-8 ">
      {/* Profile Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Profile
        </h1>
        <ProfileInfoForm profileInfo={profileInfoDoc} />
      </div>

      {/* Total Donations */}
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-200 border border-yellow-300 p-5 rounded-xl flex items-center gap-4 my-6 shadow-lg">
        <div className="flex items-center gap-3 text-gray-700">
          <span className="text-xl font-semibold">
            Total Money Received:
          </span>
          <span className="text-3xl font-bold text-yellow-600">
            ${total / 100}
          </span>
        </div>
        <a
          className="ml-auto bg-yellow-500 hover:bg-yellow-400 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          href="mailto:payouts@bmac.io"
        >
          Request a Payout
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}
