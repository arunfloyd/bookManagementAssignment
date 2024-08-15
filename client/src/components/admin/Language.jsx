import Header from "./Header";
import { API } from "../../utils/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Language = () => {
  const [languageList, setLanguageList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    name: "",
    code: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const getLanguageList = async () => {
    const response = await API.getAllLanguages();
    setLanguageList(response);
  };

  useEffect(() => {
    getLanguageList();
  }, []);

  const handleDeleteConfirm = (item) => {
    setLanguageToDelete(item);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await API.deleteLanguage(languageToDelete._id);
      setLanguageList(
        languageList.filter((lang) => lang._id !== languageToDelete._id)
      );
      setIsDeleteConfirmOpen(false);
      setStatusMessage("Language deleted successfully");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setStatusMessage("Error deleting language");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleEdit = (item) => {
    setCurrentLanguage({ id: item._id, name: item.name, code: item.code });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentLanguage({ name: "", code: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleGo = () => {
    navigate("/dashboard");
  };
  const handleSave = async () => {
    try {
      if (isEditing) {
        await API.updateLanguage(currentLanguage);
        setStatusMessage("Language updated successfully");
      } else {
        await API.addLanguage(currentLanguage);
        setStatusMessage("Language added successfully");
      }
      setIsModalOpen(false);
      getLanguageList();
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setStatusMessage("Error saving language");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Languages</h2>
          {statusMessage && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {statusMessage}
            </div>
          )}
          <button
            className="mb-6 px-4 py-2 bg-yellow-300-500 text-white rounded hover:bg-yellow-600 transition-colors"
            onClick={handleGo}
          >
            Go Back
          </button>
          <button
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleAdd}
          >
            Add Language
          </button>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {languageList &&
                  languageList.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.code}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteConfirm(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Language" : "Add Language"}
            </h3>
            <input
              className="mb-4 p-2 border rounded w-full"
              type="text"
              placeholder="Name"
              value={currentLanguage.name}
              onChange={(e) =>
                setCurrentLanguage({ ...currentLanguage, name: e.target.value })
              }
            />
            <input
              className="mb-4 p-2 border rounded w-full"
              type="text"
              placeholder="Code"
              value={currentLanguage.code}
              onChange={(e) =>
                setCurrentLanguage({ ...currentLanguage, code: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete this language?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors mr-2"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
