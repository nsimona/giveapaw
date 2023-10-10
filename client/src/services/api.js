import axios from "axios";

// user
export const signup = async (data) => {
  try {
    const response = await axios.post("/api/users/signup", data);
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

export const updatePreferences = async (data) => {
  try {
    const response = await axios.patch("/api/users/preferences", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// pets
export const createPet = async (data) => {
  try {
    const response = await axios.post("/api/pets", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPets = async () => {
  try {
    const response = await axios.get("/api/pets");
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPetQuery = async (data) => {
  const query = Object.keys(data)
    .map((param) => `${param}=${data[param]}`)
    .join("&");

  try {
    const response = await axios.get(`/api/pets/query?${query}`);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPetsByStatus = async ({ status }) => {
  try {
    const response = await axios.get(`/api/pets/status/${status}`);
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

export const changePetStatus = async (data) => {
  try {
    const response = await axios.patch("/api/pets/status", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// application
export const createApplication = async (data) => {
  try {
    const response = await axios.post("/api/applications", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getPetApplications = async (petId) => {
  try {
    const response = await axios.get(`/api/applications/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getUserApplications = async () => {
  try {
    const response = await axios.get("/api/applications");
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getApplication = async (id) => {
  try {
    const response = await axios.get(`/api/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const changeApplicationStatus = async (data) => {
  try {
    const response = await axios.patch("/api/applications/", data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// recommendation, e.g. match

export const matchUserToPet = async () => {
  try {
    const response = await axios.post("/api/recommendations/match");
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
