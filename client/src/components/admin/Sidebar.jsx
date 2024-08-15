// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-1/4 h-screen bg-gray-100 p-4">
//       <nav>
//         <ul>
//           <li className="mb-4">
//             <Link to="/">Dashboard</Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/book">Books</Link>
//           </li>
//           <li className="mb-4">
//             <Link to="/author">Authors</Link>
//           </li>
//           <li>
//             <Link to="/language">Languages</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/book" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Books
        </Link>
        <Link to="/author" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Authors
        </Link>
        <Link to="/language" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Languages
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;