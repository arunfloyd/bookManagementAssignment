import { useState, useRef } from "react";
import { API } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const otpRef = useRef(null);

  const handleButtonClick = async () => {
    if (!otp) {
      setErrorMessage("OTP is required.");
      return;
    }

    try {
      await API.verifyOtp({ otp });
      navigate("/newPassword");
    } catch (err) {
      setErrorMessage("OTP verification failed. Please try again.");
      console.log(err);
    }
  };

  const handleForgotPassword = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="absolute">
        {/* Background image can be added here */}
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full sm:w-3/12 p-6 sm:p-12 bg-black text-white rounded-lg bg-opacity-80 shadow-lg"
      >
        <h1 className="font-bold text-3xl sm:text-4xl py-4">Verify OTP</h1>

        <input
          type="number"
          placeholder="Enter OTP received on your Email"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-50 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          ref={otpRef}
          aria-label="OTP"
        />

        {errorMessage && (
          <p className="text-red-600 font-bold text-sm py-2">{errorMessage}</p>
        )}
        <button
          type="button"
          className="p-4 my-6 bg-red-800 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          Confirm OTP
        </button>
        <p
          className="py-4 cursor-pointer hover:underline"
          onClick={handleForgotPassword}
        >
          Back to Login Page?
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
