import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    accessToken: string | null;
    tokenType: string | null;

    isAuthenticated: boolean;

    setToken: (accessToken: string, tokenType: string) => void;
    clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            tokenType: null,
            isAuthenticated: false,

            setToken: (accessToken, tokenType) =>
                set({
                    accessToken,
                    tokenType,
                    isAuthenticated: true,
                }),

            clearToken: () =>
                set({
                    accessToken: null,
                    tokenType: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
