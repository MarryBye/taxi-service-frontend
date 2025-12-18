import type { CarClass, CarStatus, CityName, CountryName } from "@/types/db";

export type BaseCar<T extends object = {}> = {
    mark: string;
    model: string;
    car_number: string;
    country: CountryName;
    city: CityName;
    color: string;
    car_class: CarClass;
    car_status: CarStatus;
} & T;

export type Car = BaseCar<{
    id: number;
    created_at: string;
    changed_at: string;
    driver_id?: number;
}>;

export type CreateCar = BaseCar<{
    driver_id?: number;
}>;

export type UpdateCar = BaseCar<{
    driver_id?: number;
}>