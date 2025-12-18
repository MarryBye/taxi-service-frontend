import type { CityName, CountryName } from "@/types/db";

export type Address = {
    country_name: CountryName,
    city_name: CityName,
    street_name: string,
    house_number: string,
    latitude: number,
    longitude: number,
}