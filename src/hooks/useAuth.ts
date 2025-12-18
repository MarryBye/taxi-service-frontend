import { login as loginApi, register as registerApi } from '@/api/auth';
import { useAuthStore } from '@/store/auth.store';
import type { AuthUserSchema, RegisterUserSchema} from "@/types/auth";

export function useAuth() {
    const setToken = useAuthStore((s) => s.setToken);
    const clearToken = useAuthStore((s) => s.clearToken);

    const register = async (payload: RegisterUserSchema) => {
        await registerApi(payload)
    }

    const login = async (payload: AuthUserSchema) => {
        const res = await loginApi(payload);
        setToken(
            res.data.access_token,
            res.data.token_type
        );
    };

    const logout = () => {
        clearToken();
    };

    return { login, register, logout };
}
