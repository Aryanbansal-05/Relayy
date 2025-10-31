import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");
  const navigate = useNavigate();
  const backendURL = "http://localhost:8000";
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/v1/users/verify-otp`, { email, otp });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed. Try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendTimer(60);
      const res = await axios.post(`${backendURL}/api/v1/users/resend-otp`, { email });
      alert(res.data.message);
    } catch (err) {
      setResendTimer(0);
      alert(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-emerald-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-emerald-700 mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">Enter the 6-digit OTP sent to <b>{email}</b></p>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="Enter OTP" className="text-center text-xl tracking-widest h-12 border rounded-lg focus:ring-2 focus:ring-emerald-400" required />
          <button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-semibold">Verify OTP</button>
        </form>
        <div className="mt-6">
          <button onClick={handleResendOtp} disabled={resendTimer > 0} className={`${
              resendTimer > 0 ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"
            } text-white py-2 px-4 rounded-lg transition font-medium`}>
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
