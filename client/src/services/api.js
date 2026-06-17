import axios from "axios";

const getToken = () => localStorage.getItem("token");

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchExerciseApi = (type, difficulty) =>
  API.get(`/exercises?type=${type}&difficulty=${difficulty}`);

export const validateAnswerApi = (payload) => API.post("/feedback", payload);

export const registerUserApi = (payload) => API.post("/auth/register", payload);

export const loginUserApi = (payload) => API.post("/auth/login", payload);

export const fetchStatsApi = () => API.get("/stats");

export const fetchHistoryApi = () => API.get("/history");

export const fetchTeacherDashboardApi = () => API.get("/dashboard/teacher");
