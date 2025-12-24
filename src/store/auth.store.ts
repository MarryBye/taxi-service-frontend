import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UsersView } from "@/types/views";

type AuthState = {
    accessToken: string | null;
    tokenType: string | null;

    user: UsersView | null;
    isAuthenticated: boolean;

    setToken: (accessToken: string, tokenType: string) => void;
    setUser: (user: UsersView) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            tokenType: null,
            user: null,
            isAuthenticated: false,

            setToken: (accessToken, tokenType) =>
                set({
                    accessToken,
                    tokenType,
                    isAuthenticated: true,
                }),

            setUser: (user) =>
                set({ user }),

            clearAuth: () =>
                set({
                    accessToken: null,
                    tokenType: null,
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);
