import { useEffect, useState } from "react";
import { API } from "../../utils/Api";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer";

const Home = () => {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadTheBooks = async () => {
    try {
      const response = await API.searchBooks(searchQuery, sortField, sortOrder);
      if (response && response.books) {
        setListOfBooks(response.books);
      } else {
        throw new Error("Failed to load books");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTheBooks();
  }, [searchQuery, sortField, sortOrder]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    setSortField(field);
    setSortOrder(order);
  };

  if (loading) return <Shimmer/>

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
         style={{
           backgroundImage: "url('https://res.cloudinary.com/dbl8uexjf/image/upload/v1723693010/LibraryBG_rilkvd.png')",
         }}>
      <div className="flex-grow flex flex-col items-center justify-start py-8 px-4 bg-black bg-opacity-50">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center">
          Welcome to our Bookstore!
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by name, author, or language..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 rounded-lg flex-grow"
          />
          <select onChange={handleSortChange} className="p-2 rounded-lg">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="publishedYear-desc">Newest First</option>
            <option value="publishedYear-asc">Oldest First</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {listOfBooks.length > 0 ? (
            listOfBooks.map((book) => (
              <div
                key={book._id}
                className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <img
                  src={book.coverImage}
                  alt={book.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                />
                <h2 className="text-lg font-bold mt-4">{book.name}</h2>
                <p className="text-gray-600">By {book.author.name}</p>
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-80 text-white p-4 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">{book.name}</h2>
                  <p className="mb-1 sm:mb-2">Author: {book.author.name}</p>
                  <p className="mb-1 sm:mb-2">Language: {book.language.name}</p>
                  <p className="mb-1 sm:mb-2">Price: ₹{book.price}</p>
                  <p className="mb-1 sm:mb-2">Published Year: {book.publishedYear}</p>
                  <p className="text-xs sm:text-sm text-center">{book.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">No books available</p>
          )}
        </div>
        <Link to={"/login"} className="mt-8">
          <p className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Admin Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;