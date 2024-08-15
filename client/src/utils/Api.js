import axios from "axios";
const API_URL = "https://book-management-assignment.vercel.app/api/v1";

// Add your own API keys here

const API = {
  //Admin Login Routes
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, email, password);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/login/logout`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  //Send Otp to mail
  sendOtp: async () => {
    try {
      const response = await axios.get(`${API_URL}/resetPassword`);
      return response.data;

    } catch (err) {
      throw new Error(err.message);
    }
  },

  verifyOtp: async (otp) => {
    try {
      const response = await axios.post(`${API_URL}/resetPassword`, otp);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //new Password

  newPassword: async (password) => {
    try {
      const response = await axios.post(
        `${API_URL}/login/newPassword`,
        password
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  //Search Books according to the query
  searchBooks: async (query, sortField, sortOrder) => {
    try {
      const response = await axios.get(`${API_URL}/book/search`, {
        params: {
          query,
          sortField,
          sortOrder,
          page: 1,
          limit: 10
        }
      });
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      throw new Error(err.message);
    }
  },

  //Book Specific Routes
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${API_URL}/book`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addBook: async (formData) => {
    try {
      
      const response = await axios.post(`${API_URL}/book`, formData);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteBook: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/book/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateBook: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/book/${id}`, formData);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //Author Specific Routes
  getAllAuthors: async () => {
    try {
      const response = await axios.get(`${API_URL}/author`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteAuthor: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/author/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addAuthor: async (name) => {
    try {
      const response = await axios.post(`${API_URL}/author`, name);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateAuthor: async (value) => {
    try {
      const { id, name } = value;
      const response = await axios.put(`${API_URL}/author/${id}`, { name });
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Language Specific Routes
  getAllLanguages: async () => {
    try {
      const response = await axios.get(`${API_URL}/language`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteLanguage: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/language/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addLanguage: async (name, code) => {
    try {
      const response = await axios.post(`${API_URL}/language`, name, code);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateLanguage: async (value) => {
    try {
      const { id, name, code } = value;
      const response = await axios.put(`${API_URL}/language/${id}`, {
        name,
        code,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

export { API };
