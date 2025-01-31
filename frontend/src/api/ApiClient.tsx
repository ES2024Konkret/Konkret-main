import { Api } from "./Api";

const apiClient = new Api({
  baseURL: "http://localhost:8001",
  withCredentials: true,
});

export default apiClient;