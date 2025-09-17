import React, { useState, useEffect } from "react";
import { Globe, HelpCircle, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { toast } from "react-toastify";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/atmcard"); // ✅ redirect after OTP success
      }, 1500);
    } else {
      toast.error("Please enter a valid OTP");
    }
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

      {/* OTP Form */}
      <div className="w-full max-w-sm mt-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Enter OTP</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the 6-digit code we sent to your registered mobile number
        </p>

        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className={`w-12 h-12 text-xl bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${i < 5 ? "mr-2" : ""
                    }`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Timer */}
        <p className="text-gray-600 text-sm mb-4">
          Time left:{" "}
          <span className={timeLeft <= 30 ? "text-red-500 font-medium" : ""}>
            {formatTime(timeLeft)}
          </span>
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || timeLeft <= 0}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold flex items-center justify-center disabled:bg-gray-300"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit"}
        </button>

        {/* Resend OTP */}
        <button
          disabled={timeLeft > 0}
          onClick={() => {
            setOtp("");
            setTimeLeft(180);
          }}
          className="w-full border border-blue-400 text-blue-500 py-3 rounded-full mt-4 font-semibold disabled:text-gray-400 disabled:border-gray-300"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
