import axios from "axios";
const API_URL = "http://localhost:3000/api/v1";

const API = {
  //Admin Login Routes
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, email, password);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/login/logout`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  //Send Otp to mail
  sendOtp: async () => {
    try {
      const response = await axios.get(`${API_URL}/resetPassword`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  verifyOtp: async (otp) => {
    try {
      const response = await axios.post(`${API_URL}/resetPassword`, otp);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //new Password

  newPassword: async (password) => {
    try {
      console.log(password, 231);
      const response = await axios.post(
        `${API_URL}/login/newPassword`,
        password
      );
      console.log(response);
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
      console.log("API Response:", response.data);
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
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addBook: async (formData) => {
    try {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const response = await axios.post(`${API_URL}/book`, formData);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteBook: async (id) => {
    try {
      console.log("Delete Book:", id);
      const response = await axios.delete(`${API_URL}/book/${id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateBook: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/book/${id}`, formData);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  //Author Specific Routes
  getAllAuthors: async () => {
    try {
      const response = await axios.get(`${API_URL}/author`);
      console.log(response,444);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteAuthor: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/author/${id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addAuthor: async (name) => {
    try {
      const response = await axios.post(`${API_URL}/author`, name);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateAuthor: async (value) => {
    try {
      const { id, name, code } = value;
      console.log(name, code);
      const response = await axios.put(`${API_URL}/author/${id}`, { name });
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Language Specific Routes
  getAllLanguages: async () => {
    try {
      const response = await axios.get(`${API_URL}/language`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteLanguage: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/language/${id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addLanguage: async (name, code) => {
    try {
      const response = await axios.post(`${API_URL}/language`, name, code);
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  updateLanguage: async (value) => {
    try {
      const { id, name, code } = value;
      console.log(name, code);
      const response = await axios.put(`${API_URL}/language/${id}`, {
        name,
        code,
      });
      console.log(response);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

export { API };
