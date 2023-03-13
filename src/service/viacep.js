import axios from "axios";

const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default viaCepApi;
