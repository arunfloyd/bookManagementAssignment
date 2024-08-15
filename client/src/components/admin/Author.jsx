import { useEffect, useState } from "react";
import { API } from "../../utils/Api";
import Header from "./Header";

const Author = () => {
  const [authorList, setAuthorList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

  useEffect(() => {
    getAuthorList();
  }, []);

  // Fetches the list of authors
  const getAuthorList = async () => {
    const response = await API.getAllAuthors();
    setAuthorList(response);
  };

  const handleDelete = async () => {
    try {
      await API.deleteAuthor(authorToDelete._id);
      setAuthorList(authorList.filter((auth) => auth._id !== authorToDelete._id));
      setIsDeleteConfirmOpen(false);
      setStatusMessage("Author deleted successfully");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setStatusMessage("Error deleting author");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleDeleteConfirm = (author) => {
    setAuthorToDelete(author);
    setIsDeleteConfirmOpen(true);
  };

  const handleEdit = (author) => () => {
    setCurrentAuthor({ id: author._id, name: author.name });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentAuthor({ name: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await API.updateAuthor(currentAuthor);
        setStatusMessage("Author updated successfully");
      } else {
        await API.addAuthor(currentAuthor);
        setStatusMessage("Author added successfully");
      }
      setIsModalOpen(false);
      getAuthorList();
      setTimeout(() => setStatusMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error(error);
      setStatusMessage("Error saving author");
      setTimeout(() => setStatusMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl mb-4">Authors</h2>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAdd}
        >
          Add Author
        </button>
        {statusMessage && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {statusMessage}
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 p-4 font-bold">
              <span>Name</span>
              <span className="text-right">Actions</span>
            </div>
            {authorList && authorList.map((author) => (
              <div
                key={author._id}
                className="grid grid-cols-2 gap-4 border-b border-gray-200 p-4 items-center"
              >
                <span>{author.name}</span>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={handleEdit(author)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteConfirm(author)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg mb-4">
                {isEditing ? "Edit Author" : "Add Author"}
              </h3>
              <input
                className="mb-2 p-2 border rounded w-full"
                type="text"
                placeholder="Name"
                value={currentAuthor.name}
                onChange={(e) =>
                  setCurrentAuthor({ ...currentAuthor, name: e.target.value })
                }
              />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
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
              <p className="mb-4">Are you sure you want to delete this author?</p>
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
    </div>
  );
};

export default Author;
