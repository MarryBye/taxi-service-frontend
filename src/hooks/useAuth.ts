import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import { useAuthStore } from "@/store/auth.store";
import {useNavigate} from "react-router-dom";

import * as authApi from "@/api/auth";
import * as authTypes from "@/types/auth";
import * as views from "@/types/views";

export function useAuth() {
    const setToken = useAuthStore((s) => s.setToken);
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const navigate = useNavigate();

    const { mutate: loginMutation, loading: loginLoading, error: loginError } =
        useApiMutation<authTypes.LoginSchema, authTypes.TokenSchema>(
            authApi.login
        );

    const { mutate: registerMutation, loading: registerLoading, error: registerError } =
        useApiMutation<authTypes.RegisterSchema, views.UsersView>(
            authApi.register
        );

    const { mutate: logoutMutation, loading: logoutLoading, error: logoutError } =
        useApiMutation(
            authApi.logout
        );

    const login = async (payload: authTypes.LoginSchema) => {
        const token = await loginMutation(payload);
        if (!token) return null;

        setToken(token.access_token, token.token_type);
        navigate('/')
        return token;
    };


    const register = async (payload: authTypes.RegisterSchema) => {
        navigate('/')
        return await registerMutation(payload);
    };

    const logout = async () => {
        // @ts-ignore
        await logoutMutation();
        clearAuth();
        navigate('/')
    };

    return {
        login,
        register,
        logout,

        loginLoading,
        loginError,

        registerLoading,
        registerError,

        logoutLoading,
        logoutError,
    };
}