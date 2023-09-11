import axios from "axios";

export const signup = async (data) => {
  try {
    const response = await axios.post("/  api/users/signup", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const signin = async (data) => {
  try {
    const response = await axios.post("/api/users/signin", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const signout = async () => {
  try {
    const response = await axios.post("/api/users/signout");
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const currentUser = async () => {
  try {
    const response = await axios.get("/api/users/currentUser");
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const updateFavorites = async (data) => {
  try {
    const response = await axios.patch("/api/users/favorites", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const createPet = async (data) => {
  try {
    const response = await axios.post("/api/pets", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPets = async (ids) => {
  const query = ids ? `?ids=${ids}` : "";
  try {
    const response = await axios.get(`/api/pets${query}`);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPet = async (id) => {
  try {
    const response = await axios.get(`/api/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
