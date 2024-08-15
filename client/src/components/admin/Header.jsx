

import { useNavigate } from "react-router-dom";
import { API } from "../../utils/Api";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../store/userSlice";

// export default Header;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await API.logout();
    dispatch(setUserEmail(""));
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-lg h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Bookstore Admin</h1>
      </div>
      <div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
