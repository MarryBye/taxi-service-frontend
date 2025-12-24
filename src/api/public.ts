import api from '@/utils/api';

import * as common_schema from '@/types/common';

export const get_countries = async (): Promise<common_schema.Country[]> => {
    return api.get('/public/countries')
}

export const get_cities = async (countryId: number): Promise<common_schema.City[]> => {
    return api.get(`/public/countries/${countryId}/cities`)
}