import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const getTasks = () => API.get("/tasks");


export const createTask = (task) => {
  if (!task.date) {
    task.date = new Date().toISOString(); 
  }
  return API.post("/tasks", task);
};

export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id, token) => {
  return API.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
