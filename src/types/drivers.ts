import type { UserRole, CountryName, CityName, ClientTag, ClientCancelTag, DriverTag } from "@/types/db";
import type { User } from "@/types/users";

export type AcceptOrder = {
    order_id: number,
}

export type CancelOrderSchema = {
    comment: string,
    client_tags: ClientCancelTag[],
}

export type RateOrderSchema = {
    mark: number,
    comment?: string,
    client_tags: ClientTag[],
}

export type Driver = User & {
    earning_balance: number,
    payment_balance: number,
    car_id: number,
    rides_count: number,
    finished_rides_count: number,
    canceled_rides_count: number,
    average_distance: number,
    max_distance: number,
    driver_rating: number,
    most_popular_tag: DriverTag,
}