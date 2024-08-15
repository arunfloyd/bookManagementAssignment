import { useState } from "react";
import { API } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await API.newPassword({ password });
      navigate("/");
    } catch (err) {
      setErrorMessage("Password update failed. Please try again.");
      console.log(err);
    }
  };

  const handleForgotPassword = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full sm:w-3/12 p-6 sm:p-12 bg-black text-white rounded-lg bg-opacity-80 shadow-lg"
      >
        <h1 className="font-bold text-3xl sm:text-4xl py-4">New Password</h1>

        <input
          type="password"
          placeholder="Enter New Password"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-50 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="New Password"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-50 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          aria-label="Confirm New Password"
        />

        {errorMessage && (
          <p className="text-red-600 font-bold text-sm py-2">{errorMessage}</p>
        )}
        <button
          type="button"
          className="p-4 my-6 bg-red-800 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          Set New Password
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

export default NewPassword;
