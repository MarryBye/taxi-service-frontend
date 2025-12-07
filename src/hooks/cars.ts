import api from "../utils/axios";
import { useAxios } from "./useHooks";

async function getCars() {
  const response = await api.get(`/cars`);
  return response;
}

export function useCars() {
  return useAxios(getCars);
}

async function getCar(id: string) {
  const response = await api.get(`/cars/${id}`);
  return response;
}

export function useCar(id: string) {
  return useAxios(getCar, id);
}