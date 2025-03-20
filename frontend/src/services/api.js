import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Automatically attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (userData) => API.post("/signUp", userData);
export const login = (userData) => API.post("/login", userData);
export const createAgent = (agentData) => API.post("/createAgent", agentData);
export const getAgents = () => API.get("/agents");
export const updateAgent = (agentData , id) => API.put(`/agents/${id}` , agentData);
export const deleteAgent = (id) => API.delete(`/agents/${id}`);
export const getTasks = () => API.get("/tasks");
export const uploadTasks = (formData) =>
  API.post("/upload-tasks", formData, { headers: { "Content-Type": "multipart/form-data" } });
