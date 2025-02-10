import axios from "axios";

const clienteAxios  = axios.create({
  baseURL: "https://utn-back.netlify.app/",
});

export default clienteAxios
