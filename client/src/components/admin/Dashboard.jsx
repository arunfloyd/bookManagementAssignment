import Header from "./Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const AddBox = ({ title, link }) => (
    <Link
      to={link}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
    >
      <div className="text-gray-800 mb-4 text-center">{title}</div>
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
        +
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddBox title="Add New Books" link="/book" />
          <AddBox title="Add New Authors" link="/author" />
          <AddBox title="Add New Languages" link="/language" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
