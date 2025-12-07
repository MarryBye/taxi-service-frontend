import api from "../utils/axios";
import { useAxios } from "./useHooks";
import { useMemo } from "react";

async function getOrders(client_id?: string, driver_id?: string) {
  let baseUrl = "/orders";
  const params = new URLSearchParams();
    if (client_id) {
        params.append("client_id", client_id);
    }
    if (driver_id) {
        params.append("driver_id", driver_id);
    }
  const response = await api.get(`${baseUrl}?${params.toString()}`);
  return response;
}

export function useOrders(client_id?: string, driver_id?: string) {
  return useAxios(getOrders, client_id, driver_id);
}

async function getOrder(id: string) {
  const response = await api.get(`/orders/${id}`);
  return response;
}

export function useOrder(id: string) {
  return useAxios(getOrder, id);
}