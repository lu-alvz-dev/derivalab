import axios from "axios";

const getToken = () => localStorage.getItem("token");

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Authentication

export const registerUserApi = (payload) => API.post("/auth/register", payload);

export const loginUserApi = (payload) => API.post("/auth/login", payload);

// Practice

export const fetchExerciseApi = (type, difficulty) =>
  API.get(`/exercises?type=${type}&difficulty=${difficulty}`);

export const validateAnswerApi = (payload) => API.post("/feedback", payload);

export const fetchStatsApi = () => API.get("/stats");

// Student

export const fetchStudentDashboardApi = () => API.get("/student-dashboard");

export const fetchHistoryApi = () => API.get("/history");

// Teacher Dashboard

export const fetchTeacherDashboardApi = () => API.get("/dashboard/teacher");

export const fetchTeacherStudentsApi = () =>
  API.get("/dashboard/teacher/students");

// Teacher Charts

export const fetchAccuracyChartApi = () =>
  API.get("/dashboard/teacher/accuracy");

export const fetchErrorsChartApi = () => API.get("/dashboard/teacher/errors");

export const fetchDifficultyChartApi = () =>
  API.get("/dashboard/teacher/difficulty");

// Teacher Student

export const fetchTeacherStudentDashboardApi = (studentId) =>
  API.get(`/dashboard/teacher/student/${studentId}`);

export const fetchTeacherStudentHistoryApi = (studentId) =>
  API.get(`/dashboard/teacher/student/${studentId}/history`);

export const fetchTeacherStudentAccuracyApi = (studentId) =>
  API.get(`/dashboard/teacher/student/${studentId}/accuracy`);

export const fetchTeacherStudentErrorsApi = (studentId) =>
  API.get(`/dashboard/teacher/student/${studentId}/errors`);

export const fetchTeacherStudentDifficultyApi = (studentId) =>
  API.get(`/dashboard/teacher/student/${studentId}/difficulty`);
