import type { DriverCancelTag, CarClass, PaymentMethod, DriverTag, ClientTag, CountryName, CityName } from "@/types/db";
import type { Address } from "@/types/common";
import type { User } from "@/types/users";

export type CancelOrder = {
    comment: string,
    driver_tags: DriverCancelTag[],
}

export type MakeOrder = {
    order_class: CarClass,
    payment_method: PaymentMethod,
    amount: number,
    addresses: Address[],
}

export type RateOrder = {
    mark: number,
    comment?: string,
    driver_tags: DriverTag[],
}

export type UpdateProfile = {
    email?: string,
    tel_number?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    country_name?: CountryName,
    city_name?: CityName
}

export type Client = User & {
    payment_balance?: number,
    rides_count?: number,
    finished_rides_count?: number,
    canceled_rides_count?: number,
    average_distance?: number,
    max_distance?: number,
    client_rating?: number,
    most_popular_tag: ClientTag,
}