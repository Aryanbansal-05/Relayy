import React from "react";
import Navbar from "../Navbar";
import Header from "../components/Header"; // same header component

function Faqs() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header title="FAQs" />

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-purple-800 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {/* FAQ 1 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              1. What is RELAYY?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              RELAYY is a localized e-commerce platform built for students of a
              specific institution to buy and sell pre-owned items. The goal is
              to reduce waste by giving used items a second life — instead of
              discarding them or buying new ones unnecessarily.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              2. Who can use RELAYY?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Only verified students from the same institution can use RELAYY.
              This ensures that all buyers and sellers belong to the same
              trusted community.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              3. How do I list an item for sale?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Simply log in with your student credentials, go to the “Sell”
              section, fill out the item details (title, price, description,
              photos), and publish your listing. Your item will instantly appear
              to other students on the platform.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              4. How can I contact a seller?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Each listing includes a “Chat Now” option. You can chat or
              message the seller directly through the in-app communication
              system or the contact details provided.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              5. Is there any transaction or service fee?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              No, RELAYY does not charge any transaction fees. The platform
              simply connects students to exchange items directly. Payments can
              be made in person or via any preferred method agreed upon by both
              parties.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              6. How does RELAYY promote sustainability?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              RELAYY encourages students to reuse, recycle, and reduce waste by
              enabling the exchange of pre-owned items. Every item reused means
              fewer resources consumed and less waste generated.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
              7. What types of items can I sell?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              You can list almost any student-relevant item — books, electronics,
              lab equipment, furniture, stationery, or even club merchandise —
              as long as it complies with your institution’s guidelines.
            </p>
          </div>

          {/* FAQ 8 */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
                8. How does RELAYY ensure safety and trust between users?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
                All users are verified through their institution email before creating an account.
                This ensures that only genuine students from your college or university can interact,
                reducing the chances of scams or fake listings.
            </p>
            </div>

            {/* FAQ 9 */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
                9. Can I edit or remove my listing after posting it?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
                Yes, you can easily manage your listings from your profile dashboard. You can
                edit details, change photos, mark an item as sold, or delete it anytime.
            </p>
            </div>

            {/* FAQ 10 */}
            <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-purple-700">
                10. What should I do after buying or selling an item?
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
                Once the exchange is complete, both users can mark the transaction as successful.
                This helps maintain a reliable record and improves the platform’s trust score for active users.
            </p>
            </div>


        </div>
      </section>

    </>
  );
}

export default Faqs;
