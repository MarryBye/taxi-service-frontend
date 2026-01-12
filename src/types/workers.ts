import type * as enums from '@/types/enums/db';
import type * as common from '@/types/common';

export type CancelOrderSchema = {
    comment: string;
    tags: enums.DriverCancelTags[];
}

export type RateOrderSchema = {
    mark: number;
    comment: string;
    tags: enums.DriverTags[];
}

export type WithdrawCashSchema = {
    amount: number;
}