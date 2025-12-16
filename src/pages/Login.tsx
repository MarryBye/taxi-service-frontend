import React from 'react';

import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { LoginForm } from "@/components/forms/LoginForm";
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage(): React.ReactElement {
    const { login } = useAuth();
    return (
        <DefaultLayout>
            <LoginForm onSubmit={login} />
        </DefaultLayout>
    );
}
