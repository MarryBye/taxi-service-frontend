import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";

import * as publicApi from "@/api/public";
import * as common_schemas from "@/types/common";

export function useCountriesList() {
    return useApiQuery<common_schemas.Country[]>(
        () => publicApi.get_countries(),
        []
    );
}

export function useCitiesList(countryId: number) {
    return useApiQuery<common_schemas.City[]>(
        () => publicApi.get_cities(countryId),
        [countryId]
    );
}