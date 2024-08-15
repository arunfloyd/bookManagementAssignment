import { useEffect, useState } from "react";
import { API } from "../../utils/Api";
import { Link } from "react-router-dom";

const Home = () => {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(err.message);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dbl8uexjf/image/upload/v1723693010/LibraryBG_rilkvd.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <h1 className="relative text-white text-5xl font-bold mb-8 z-10">
        Welcome to our Bookstore!
      </h1>

      <div className="relative z-10 flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, author, or language..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded-lg"
        />
        <select onChange={handleSortChange} className="p-2 rounded-lg">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="publishedYear-desc">Newest First</option>
          <option value="publishedYear-asc">Oldest First</option>
        </select>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {listOfBooks.length > 0 ? (
          listOfBooks.map((book) => (
            <div
              key={book._id}
              className="relative bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={book.coverImage}
                alt={book.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-lg font-bold mt-4">{book.name}</h2>
              <p className="text-gray-600">By {book.author.name}</p>

              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-80 text-white p-4 opacity-0 hover:opacity-100 transition-opacity">
                <h2 className="text-2xl font-bold mb-4">{book.name}</h2>
                <p className="mb-2">Author: {book.author.name}</p>
                <p className="mb-2">Language: {book.language.name}</p>
                <p className="mb-2">Price: ${book.price}</p>
                <p className="mb-2">Published Year: {book.publishedYear}</p>
                <p className="text-sm">{book.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>

      <Link to={"/login"} className="relative z-10 mt-auto mb-4">
        <p className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
          Admin Login
        </p>
      </Link>
    </div>
  );
};

export default Home;
