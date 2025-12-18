import type { CityName, UserRole, CountryName } from "@/types/db";

export type BaseUser<T extends object = {}> = {
    email: string;
    tel_number: string;
    first_name: string;
    last_name: string;
    country: CountryName;
    city: CityName;
    role: UserRole;
} & T;

export type User = BaseUser<{
    id: number;
    created_at: string;
    changed_at: string;
}>;

export type UpdateUser = {
    tel_number?: string;
    password?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    city?: CityName;
    country?: CountryName;
}


export type AdminUpdateUser = UpdateUser & {
    role?: UserRole;
}

export type CreateUser = BaseUser<{
    login: string;
    password: string;
}>