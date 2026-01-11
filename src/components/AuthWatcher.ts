import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useProfile} from "@/hooks/useClients";

export function AuthWatcher() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const navigate = useNavigate();
    const { refetch } = useProfile();

    useEffect(() => {
        refetch();
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated]);

    return null;
}