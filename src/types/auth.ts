import type * as enums from '@/types/enums/db';
import type * as common from '@/types/common';

export type LoginSchema = {
    login: string;
    password: string;
}

export type RegisterSchema = {
    login: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    tel_number: string;
    city_id: number;
}

export type TokenSchema = {
    access_token: string;
    token_type: string;
}