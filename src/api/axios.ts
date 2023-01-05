import axios from "axios";

const url = "http://localhost:8080";

export default axios.create({
  baseURL: url,
});

export const axiosTodo = axios.create({
  baseURL: url,
  headers: {"Authorization": JSON.stringify(localStorage.getItem('accessToken'))}
})

export const axiosPrivate = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
