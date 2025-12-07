import api from "../utils/axios";
import { useAxios } from "./useHooks";
import { useMemo } from "react";

async function getDrivers() {
  const response = await api.get(`/drivers`);
  return response;
}

export function useDrivers() {
  return useAxios(getDrivers);
}

async function getDriver(id: string) {
  const response = await api.get(`/drivers/${id}`);
  return response;
}

export function useDriver(id: string) {
  return useAxios(getDriver, id);
}