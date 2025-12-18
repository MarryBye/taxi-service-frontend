import type { CityName, CountryName } from "@/types/db";

export type AuthUserSchema = {
    login: string,
    password: string
}

export type AuthResponseUserSchema = {
    id: number,
    login: string
    password: string
    role: string
}

export type RegisterUserSchema = {
    login: string,
    email: string,
    tel_number: string,
    password: string,
    first_name: string,
    last_name: string,
    country: CountryName,
    city: CityName
}