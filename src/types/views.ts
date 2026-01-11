import type * as enums from '@/types/enums/db';
import type * as common from '@/types/common';
import type {ClientCancelTags, ClientTags, DriverCancelTags, DriverTags} from "@/types/enums/db";

export type UsersView = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    tel_number: string;
    city: common.City;
    role: enums.UserRoles;
    payment_balance: number;
    earning_balance: number;
    created_at: string;
    changed_at: string;
}

export type ClientsStatView = {
    id: number;
    rides_count: number;
    finished_rides_count: number;
    canceled_rides_count: number;
    average_distance: number | null;
    max_distance: number | null;
    client_rating: number | null;
    all_tags: ({
        tag: ClientTags | DriverCancelTags,
        count: number,
    })[] | null;
}

export type CarsView = {
    id: number;
    driver: UsersView | null;
    mark: string;
    model: string;
    number_plate: string;
    city: common.City;
    color: enums.Colors;
    car_class: enums.CarClasses;
    car_status: enums.CarStatuses;
    created_at: string;
    changed_at: string;
}

export type DriversStatCat = {
    id: number;
    mark: string;
    model: string;
    number_plate: string;
    color: enums.Colors;
    car_class: enums.CarClasses;
    car_status: enums.CarStatuses;
    created_at: string;
    changed_at: string;
}

export type DriversStatView = {
    id: number;
    car: DriversStatCat | null;
    rides_count: number;
    finished_rides_count: number;
    canceled_rides_count: number;
    average_distance: number | null;
    max_distance: number | null;
    driver_rating: number | null;
    all_tags: ({
        tag: DriverTags | ClientCancelTags,
        count: number,
    })[] | null;
}

export type OrdersView = {
    id: number;
    client: UsersView;
    driver: UsersView | null;
    transaction: common.Transaction;
    route: common.Route;
    status: enums.OrderStatuses;
    order_class: enums.CarClasses;
    finished_at: string | null;
    created_at: string;
    changed_at: string;
}

export type OrdersStatView = {
    id: number;
    rating_by_client: common.Rating | null;
    rating_by_driver: common.Rating | null;
    cancel_info: common.Cancel | null;
    duration: number | null;
}

export type MaintenancesView = {
    id: number;
    car: CarsView;
    description: string;
    cost: number;
    maintenance_start: string;
    maintenance_end: string;
    created_at: string;
    changed_at: string;
    status: enums.MaintenanceStatuses;
}

export type TransactionsView = {
    id: number;
    user: UsersView;
    balance_type: enums.BalanceTypes;
    transaction_type: enums.TransactionType;
    payment_method: enums.PaymentMethods;
    amount: number;
    created_at: string;
}