import React, { useState } from "react";
import { Eye, EyeOff, Globe, HelpCircle, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch"; // shadcn/ui Switch
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const Login = () => {
  const [saveLogin, setSaveLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/otp"); // redirect after 2s
    }, 2000);
  };

  return (
    <div className="min-h-[90vh] flex flex-col bg-gray-100 p-6">
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
        {/* Username with Switch */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-28"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">Save Login</span>
            <Switch checked={saveLogin} onCheckedChange={setSaveLogin} />
          </div>
        </div>

        {/* Password with Eye Toggle */}
        <div className="mb-2 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {passwordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <button className="text-blue-600 text-sm font-bold">Forgot Credentials?</button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#d9e7f2] text-blue-500 py-3 rounded-full font-semibold flex items-center justify-center disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
        </button>

        {/* Biometric Warning */}
        <div className="bg-[#fbe8c8] text-gray-700 text-sm p-3 rounded-lg mt-4">
          Biometric is not yet enabled for this App on this device, use your
          username and password to login.
        </div>

        {/* Register */}
        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] border border-blue-400 text-blue-500 py-3 rounded-full mt-6 font-semibold">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
