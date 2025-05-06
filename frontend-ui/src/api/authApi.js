import axios from "axios";

// Update this base URL if you're using a different backend port or proxy
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
