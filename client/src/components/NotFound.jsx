
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-red-800 rounded-lg text-white font-semibold hover:bg-red-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
