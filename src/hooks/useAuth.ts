import { login as loginApi, register as registerApi } from '@/api/auth';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();
    const setToken = useAuthStore((s) => s.setToken);
    const clearToken = useAuthStore((s) => s.clearToken);

    const register = async (
        login: string,
        email: string,
        tel_number: string,
        password: string,
        first_name: string,
        last_name: string,
        country: string,
        city: string
    ) => {
        await registerApi({
            login, email, tel_number, password, first_name, last_name, country, city
        })
        navigate('/login')
    }

    const login = async (login: string, password: string) => {
        const res = await loginApi({ login, password });
        setToken(
            res.data.access_token,
            res.data.token_type
        );
        navigate('/profile')
    };

    const logout = () => {
        clearToken();
    };

    return { login, register, logout };
}
