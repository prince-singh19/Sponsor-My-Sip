export default function FaqPage() {
    const faqList = [
      {
        question: "What is Sponsor My Sip?",
        answer:
          "Sponsor My Sip is a platform that allows creators to receive donations directly from their audience in the form of a virtual chai. It's a way for supporters to show appreciation for creators' content.",
      },
      {
        question: "How do I donate?",
        answer:
          "To donate, simply go to a creator's profile page and click the 'Buy Me a Chai' button. You can use different payment methods, including credit cards, PayPal, and others.",
      },
      {
        question: "Can I withdraw my donations?",
        answer:
          "Yes! Creators can request payouts once they reach the minimum payout threshold. This can be done directly from the dashboard.",
      },
      {
        question: "Is Sponsor My Sip free to use?",
        answer:
          "Yes, it is free to use for both creators and supporters. Sponsor My Sip only takes a small fee on each donation to cover transaction costs.",
      },
    ];
  
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r">
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
          {/* Page Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-yellow-500">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-lg text-gray-700">Here are some of the most common questions about Sponsor My Sip.</p>
          </div>
  
          {/* FAQ List */}
          <div className="space-y-6">
            {faqList.map((faq, index) => (
              <div key={index} className="border-b py-4">
                <h2 className="text-xl font-medium text-gray-800">{faq.question}</h2>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
  
          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-6">
            <p className="text-gray-700">Powered by <span className="font-semibold text-yellow-600">Sponsor My Sip</span></p>
          </div>
        </div>
      </div>
    );
  }
  