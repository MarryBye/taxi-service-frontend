import api from "../utils/axios";
import { useAxios } from "./useHooks";
import { useMemo } from "react";

async function getUsers() {
  const response = await api.get("/users");
  return response;
}

export function useUsers() {
  return useAxios(getUsers);
}

async function getUser(id: string) {
  const response = await api.get(`/users/${id}`);
  return response;
}

export function useUser(id: string) {
  return useAxios(getUser, id);
}