import api from "../utils/axios";
import { useAxios } from "./useHooks";

async function getUsers() {
  const response = await api.get("/users");
  return response;
}

export function useUsers() {
  return useAxios(getUsers);
}