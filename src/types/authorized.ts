import type * as enums from '@/types/enums/db';
import type * as common from '@/types/common';

export type CancelOrderSchema = {
    comment: string;
    tags: enums.ClientCancelTags[];
}

export type MakeOrderSchema = {
    order_class: enums.CarClasses;
    payment_method: enums.PaymentMethods;
    addresses: common.Address[];
}

export type RateOrderSchema = {
    mark: number;
    comment: string;
    tags: enums.ClientTags[];
}

export type UpdateProfile = {
    first_name: string;
    last_name: string;
    email: string;
    tel_number: string;
    city_id: number;
    password: string;
}