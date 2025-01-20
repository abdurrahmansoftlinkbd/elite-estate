import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b10-a12-elite-estate-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
