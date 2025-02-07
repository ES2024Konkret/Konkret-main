import { Api } from "./Api";

const apiClient = new Api({
  baseUrl: "http://localhost:8001",
  withCredentials: true,
});

export default apiClient;