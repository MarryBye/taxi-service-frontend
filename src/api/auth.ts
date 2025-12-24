import api from '@/utils/api';

import * as auth_schemas from '@/types/auth';
import * as views_schemas from '@/types/views';

export const login = async (
    data: auth_schemas.LoginSchema
): Promise<auth_schemas.TokenSchema> => {
    return api.post('/auth/login', data);
}

export const register = async (
    data: auth_schemas.RegisterSchema
): Promise<views_schemas.UsersView> => {
    return api.post('/auth/register', data);
}

export const logout = async () => {
    return api.post('/auth/logout');
}