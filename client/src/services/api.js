import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchExerciseApi = (type, difficulty) =>
  API.get(`/exercises?type=${type}&difficulty=${difficulty}`);

export const validateAnswerApi = (payload) => API.post("/feedback", payload);
