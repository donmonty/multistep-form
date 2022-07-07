import { create } from "apisauce";

const client = create({
  baseURL: "http://localhost:3001/api/",
});

export default client;