import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/admin/cars";

import type { Car, CreateCar, UpdateCar } from "@/types/cars";

export function useCars() {
    return useApiQuery<Car[]>(api.listCars, []);
}

export function useCar(carId: number) {
    return useApiQuery<Car>(() => api.getCar(carId), [carId]);
}

export function useCreateCar() {
    return useApiMutation<CreateCar, Car>(api.createCar);
}

export function useUpdateCar(carId: number) {
    return useApiMutation<UpdateCar, Car>((payload) =>
        api.updateCar(carId, payload)
    );
}

export function useDeleteCar() {
    return useApiMutation<number, void>((carId) =>
        api.deleteCar(carId)
    );
}
