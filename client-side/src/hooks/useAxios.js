import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default useAxios;
