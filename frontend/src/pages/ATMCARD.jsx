import React, { useState } from "react";
import { Globe, HelpCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { toast } from "react-toastify";

const ATMCARD = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);

  // Format card number visually as "#### #### #### ####"
  const formatCardNumber = (digits) => {
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleCardChange = (e) => {
    // Keep only digits, max 16
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(formatCardNumber(onlyDigits));
  };

  const handlePinChange = (e) => {
    // Keep only digits, max 4
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(onlyDigits);
  };

  const handleSubmit = () => {
    const rawCard = cardNumber.replace(/\s/g, "");
    if (rawCard.length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }
    if (pin.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // go to next step (OTP for ATM card)
      navigate("/atm-otp");
    }, 1500);
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

      {/* ATM Card Form */}
      <div className="w-full max-w-sm mt-6">
        <h2 className="text-xl font-semibold mb-2 text-center">ATM Card</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your ATM card number and PIN to continue
        </p>

        {/* Card Number Input */}
        <div className="mb-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter Card Number (16 digits)"
            value={cardNumber}
            onChange={handleCardChange}
            className="w-full p-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest"
          />
        </div>

        {/* PIN Input */}
        <div className="mb-6 relative">
          <input
            type={pinVisible ? "text" : "password"}
            inputMode="numeric"
            placeholder="Enter PIN (4 digits)"
            value={pin}
            onChange={handlePinChange}
            className="w-full p-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            maxLength={4}
          />
          <button
            type="button"
            onClick={() => setPinVisible((v) => !v)}
            className="absolute right-4 top-4 text-gray-500"
          >
            {pinVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
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

export default ATMCARD;
