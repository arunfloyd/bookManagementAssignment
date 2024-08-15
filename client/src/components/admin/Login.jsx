import { useState, useRef, useEffect } from "react";
import { API } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail } from "../../store/userSlice";

const Login = () => {
  const userEmail = useSelector((state) => state.user.email);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (userEmail) {
      navigate("/dashboard");
    }
  }, [userEmail, navigate]);

  const handleButtonClick = async () => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      await API.login({ email, password });
      dispatch(setUserEmail(email));
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    await API.sendOtp();
    navigate("/verifyOtp");
    console.log("Forgot password clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="absolute">
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full sm:w-3/12 p-6 sm:p-12 bg-black text-white rounded-lg bg-opacity-80 shadow-lg"
      >
        <h1 className="font-bold text-3xl sm:text-4xl py-4">Admin Sign In</h1>

        <input
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-50 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          aria-label="Email Address"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-50 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
          aria-label="Password"
        />
        {errorMessage && (
          <p className="text-red-600 font-bold text-sm py-2">{errorMessage}</p>
        )}
        <button
          type="button"
          className="p-4 my-6 bg-red-800 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          Sign In
        </button>
        <p
          className="py-4 cursor-pointer hover:underline"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Login;
