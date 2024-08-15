// import { useEffect, useState } from "react";
// import { API } from "../../utils/Api";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const Book = () => {
//   const [bookList, setBookList] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBook, setCurrentBook] = useState({
//     _id: null,
//     name: "",
//     description: "",
//     price: "",
//     author: "",
//     language: "",
//     publishedYear: "",
//     coverImage: null,
//   });
//   const [authors, setAuthors] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [previewImage, setPreviewImage] = useState(null);

//   // Fetch all books, authors, and languages
//   const getAllBooks = async () => {
//     const response = await API.getAllBooks();
//     setBookList(response);
//   };

//   const getAllAuthors = async () => {
//     const response = await API.getAllAuthors();
//     setAuthors(response);
//   };

//   const getAllLanguages = async () => {
//     const response = await API.getAllLanguages();
//     setLanguages(response);
//   };

//   useEffect(() => {
//     getAllBooks();
//     getAllAuthors();
//     getAllLanguages();
//   }, []);

//   // Handle file input change for cover image
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setCurrentBook({ ...currentBook, coverImage: file });
//     setPreviewImage(URL.createObjectURL(file)); // Preview the image
//   };

//   // Handle form submission for adding/updating a book
//   const handleSave = async () => {
//     const formData = new FormData();
//     formData.append("name", currentBook.name);
//     formData.append("description", currentBook.description);
//     formData.append("price", currentBook.price);
//     formData.append("author", currentBook.author);
//     formData.append("language", currentBook.language);
//     formData.append("publishedYear", currentBook.publishedYear);
//     formData.append("coverImage", currentBook.coverImage);

//     if (currentBook._id) {
//       await API.updateBook(currentBook._id, formData);
//     } else {
//       await API.addBook(formData);
//     }

//     setIsModalOpen(false);
//     getAllBooks();
//   };

//   // Handle opening the modal for adding a new book
//   const handleAdd = () => {
//     setCurrentBook({
//       _id: null,
//       name: "",
//       description: "",
//       price: "",
//       author: "",
//       language: "",
//       publishedYear: "",
//       coverImage: null,
//     });
//     setPreviewImage(null);
//     setIsModalOpen(true);
//   };

//   // Handle editing an existing book
//   const handleEdit = (book) => {
//     setCurrentBook({
//       _id: book._id,
//       name: book.name,
//       description: book.description,
//       price: book.price,
//       author: book.author._id,
//       language: book.language._id,
//       publishedYear: book.publishedYear,
//       coverImage: book.coverImage,
//     });
//     setPreviewImage(book.coverImage); // Show existing cover image as preview
//     setIsModalOpen(true);
//   };

//   // Handle deleting a book
//   const handleDelete = async (bookId) => {
//     await API.deleteBook(bookId);
//     getAllBooks();
//   };

//   return (
//     <div>
//       <Header />
//       <Sidebar />
//       <div className="p-4">
//         <button
//           className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleAdd}
//         >
//           Add Book
//         </button>
//         <ul>
//           {bookList &&
//             bookList.map((item, index) => (
//               <li key={index} className="mb-2">
//                 <span>{item.name}</span>
//                 <span>{item.description}</span>
//                 <span>{item.price}</span>
//                 <span>{item.author.name}</span>
//                 <span>{item.language.name}</span>
//                 <span>{item.publishedYear}</span>
//                 <img src={item.coverImage} alt="Cover" width="50" />
//                 <button
//                   className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
//                   onClick={() => handleEdit(item)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//         </ul>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-lg mb-4">
//               {currentBook._id ? "Edit" : "Add"} Book
//             </h3>
//             <form>
//               <label className="block mb-2">Name of the Book</label>
//               <input
//                 className="mb-4 p-2 border rounded w-full"
//                 type="text"
//                 placeholder="Enter the name of the book"
//                 value={currentBook.name}
//                 onChange={(e) =>
//                   setCurrentBook({ ...currentBook, name: e.target.value })
//                 }
//               />

//               <label className="block mb-2">Description</label>
//               <input
//                 className="mb-4 p-2 border rounded w-full"
//                 type="text"
//                 placeholder="Enter the description for the book"
//                 value={currentBook.description}
//                 onChange={(e) =>
//                   setCurrentBook({
//                     ...currentBook,
//                     description: e.target.value,
//                   })
//                 }
//               />

//               <label className="block mb-2">Author</label>
//               <select
//                 className="mb-4 p-2 border rounded w-full"
//                 value={currentBook.author}
//                 onChange={(e) =>
//                   setCurrentBook({ ...currentBook, author: e.target.value })
//                 }
//               >
//                 <option value="">Select Author</option>
//                 {authors.map((author) => (
//                   <option key={author._id} value={author._id}>
//                     {author.name}
//                   </option>
//                 ))}
//               </select>

//               <label className="block mb-2">Price</label>
//               <input
//                 className="mb-4 p-2 border rounded w-full"
//                 type="number"
//                 placeholder="Price in INR"
//                 value={currentBook.price}
//                 onChange={(e) =>
//                   setCurrentBook({ ...currentBook, price: e.target.value })
//                 }
//               />

//               <label className="block mb-2">Language</label>
//               <select
//                 className="mb-4 p-2 border rounded w-full"
//                 value={currentBook.language}
//                 onChange={(e) =>
//                   setCurrentBook({ ...currentBook, language: e.target.value })
//                 }
//               >
//                 <option value="">Select Language</option>
//                 {languages.map((language) => (
//                   <option key={language._id} value={language._id}>
//                     {language.name}
//                   </option>
//                 ))}
//               </select>

//               <label className="block mb-2">Publish Year</label>
//               <input
//                 className="mb-4 p-2 border rounded w-full"
//                 type="number"
//                 placeholder="Year"
//                 value={currentBook.publishedYear}
//                 onChange={(e) =>
//                   setCurrentBook({
//                     ...currentBook,
//                     publishedYear: e.target.value,
//                   })
//                 }
//               />

//               <label className="block mb-2">Add a Cover Image</label>
//               <input
//                 className="mb-4 p-2 border rounded w-full"
//                 type="file"
//                 onChange={handleFileChange}
//               />
//               {previewImage && (
//                 <img src={previewImage} alt="Cover Preview" width="100" />
//               )}

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Book;

import { useEffect, useState } from "react";
import { API } from "../../utils/Api";
import Header from "./Header";

const Book = () => {
  // State declarations remain unchanged...
  const [bookList, setBookList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    _id: null,
    name: "",
    description: "",
    price: "",
    author: "",
    language: "",
    publishedYear: "",
    coverImage: null,
  });
  const [authors, setAuthors] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch all books, authors, and languages
  const getAllBooks = async () => {
    const response = await API.getAllBooks();
    setBookList(response);
  };

  const getAllAuthors = async () => {
    const response = await API.getAllAuthors();
    setAuthors(response);
  };

  const getAllLanguages = async () => {
    const response = await API.getAllLanguages();
    setLanguages(response);
  };

  // Fetching functions remain unchanged...

  useEffect(() => {
    getAllBooks();
    getAllAuthors();
    getAllLanguages();
  }, []);

  // Event handlers remain unchanged...
  // Handle file input change for cover image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentBook({ ...currentBook, coverImage: file });
    setPreviewImage(URL.createObjectURL(file)); // Preview the image
  };

  // Handle form submission for adding/updating a book
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", currentBook.name);
    formData.append("description", currentBook.description);
    formData.append("price", currentBook.price);
    formData.append("author", currentBook.author);
    formData.append("language", currentBook.language);
    formData.append("publishedYear", currentBook.publishedYear);
    formData.append("coverImage", currentBook.coverImage);

    if (currentBook._id) {
      await API.updateBook(currentBook._id, formData);
    } else {
      await API.addBook(formData);
    }

    setIsModalOpen(false);
    getAllBooks();
  };

  // Handle opening the modal for adding a new book
  const handleAdd = () => {
    setCurrentBook({
      _id: null,
      name: "",
      description: "",
      price: "",
      author: "",
      language: "",
      publishedYear: "",
      coverImage: null,
    });
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  // Handle editing an existing book
  const handleEdit = (book) => {
    setCurrentBook({
      _id: book._id,
      name: book.name,
      description: book.description,
      price: book.price,
      author: book.author._id,
      language: book.language._id,
      publishedYear: book.publishedYear,
      coverImage: book.coverImage,
    });
    setPreviewImage(book.coverImage); // Show existing cover image as preview
    setIsModalOpen(true);
  };

  // Handle deleting a book
  const handleDelete = async (bookId) => {
    await API.deleteBook(bookId);
    getAllBooks();
  };

  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={handleAdd}
      >
        Add Book
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Author</th>
              <th>Language</th>
              <th>Year</th>
              <th>Cover</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookList.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.author.name}</td>
                <td>{item.language.name}</td>
                <td>{item.publishedYear}</td>
                <td><img src={item.coverImage} alt="Cover" width="50" /></td>
                <td>
                  <button
                    className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Modal remains unchanged... */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg mb-4">
                {currentBook._id ? "Edit" : "Add"} Book
              </h3>
              <form>
                <label className="block mb-2">Name of the Book</label>
                <input
                  className="mb-4 p-2 border rounded w-full"
                  type="text"
                  placeholder="Enter the name of the book"
                  value={currentBook.name}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, name: e.target.value })
                  }
                />

                <label className="block mb-2">Description</label>
                <input
                  className="mb-4 p-2 border rounded w-full"
                  type="text"
                  placeholder="Enter the description for the book"
                  value={currentBook.description}
                  onChange={(e) =>
                    setCurrentBook({
                      ...currentBook,
                      description: e.target.value,
                    })
                  }
                />

                <label className="block mb-2">Author</label>
                <select
                  className="mb-4 p-2 border rounded w-full"
                  value={currentBook.author}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, author: e.target.value })
                  }
                >
                  <option value="">Select Author</option>
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.name}
                    </option>
                  ))}
                </select>

                <label className="block mb-2">Price</label>
                <input
                  className="mb-4 p-2 border rounded w-full"
                  type="number"
                  placeholder="Price in INR"
                  value={currentBook.price}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, price: e.target.value })
                  }
                />

                <label className="block mb-2">Language</label>
                <select
                  className="mb-4 p-2 border rounded w-full"
                  value={currentBook.language}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, language: e.target.value })
                  }
                >
                  <option value="">Select Language</option>
                  {languages.map((language) => (
                    <option key={language._id} value={language._id}>
                      {language.name}
                    </option>
                  ))}
                </select>

                <label className="block mb-2">Publish Year</label>
                <input
                  className="mb-4 p-2 border rounded w-full"
                  type="number"
                  placeholder="Year"
                  value={currentBook.publishedYear}
                  onChange={(e) =>
                    setCurrentBook({
                      ...currentBook,
                      publishedYear: e.target.value,
                    })
                  }
                />

                <label className="block mb-2">Add a Cover Image</label>
                <input
                  className="mb-4 p-2 border rounded w-full"
                  type="file"
                  onChange={handleFileChange}
                />
                {previewImage && (
                  <img src={previewImage} alt="Cover Preview" width="100" />
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Book;