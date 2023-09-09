import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://server-side-tawny-sigma.vercel.app",
});

export default useAxios;
