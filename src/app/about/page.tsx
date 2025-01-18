

export default async function AboutPage() {
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            About Sponsor My Sip
          </h1>
          <p className="mt-2 text-lg text-gray-700">Your platform to support creators directly.</p>
        </div>

        {/* About Content */}
        <div className="space-y-4">
          <p className="text-xl text-gray-800">
            Sponsor My Sip is a platform designed to enable creators to receive support directly from their audience.
            Whether you’re a creator, influencer, or just someone with great content, this platform helps you stay
            connected with your supporters and receive donations in the easiest way possible.
          </p>
          <p className="text-xl text-gray-800">
            We believe in the power of community, and Sponsor My Sip makes it easier than ever to offer a virtual “chai”
            as a token of appreciation for your favorite creators.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p className="text-gray-700">Powered by <span className="font-semibold text-yellow-600">Sponsor My Sip</span></p>
        </div>
      </div>
    </div>
  );
}
