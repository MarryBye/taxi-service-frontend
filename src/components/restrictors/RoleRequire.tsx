import React from 'react';
import { useProfile } from "@/hooks/useClients";

type RoleRequireProps = React.PropsWithChildren<{
   needRoles: string[];
   invert?: boolean;
}>;

export function RequireRole(
    {children, needRoles, invert = false}: RoleRequireProps
): React.ReactElement | null {
    const {data, loading, error} = useProfile();

    const userRole = data !== null && !error ? data.role : 'guest';
    const isAllowed = invert ? !needRoles.includes(userRole) : needRoles.includes(userRole);

    if (!isAllowed) return null;

    return (
        <div>
            {children}
        </div>
    )
}
