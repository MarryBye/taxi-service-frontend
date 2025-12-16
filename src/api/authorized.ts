import api from './api';
import { useAxios } from "@/hooks/useAxios";

type AxiosResponse = {
    data: any,
    loading: boolean,
    error: any,
    refetch: () => void
}

export function useProfile(): AxiosResponse {
    return useAxios(() => {
        return api.get('/authorized/profile')
    });
}