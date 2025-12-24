import { useAuthStore } from "@/store/auth.store";
import type { UserRoles } from "@/types/enums/db";

export function RequireRole(
    { children, needRoles, invert }: React.PropsWithChildren<
        { needRoles: UserRoles[], invert?: boolean }
    >
) {
    const user = useAuthStore((s) => s.user);
    const role = user?.role ? user.role : 'guest';

    if (invert) {
        return !needRoles.includes(role) ? <>{children}</> : null;
    } else {
        return needRoles.includes(role) ? <>{children}</> : null;
    }
}
