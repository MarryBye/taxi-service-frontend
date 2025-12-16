import React from 'react';

import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Register(): React.ReactElement {
    return (
        <DefaultLayout>
            <RegisterForm />
        </DefaultLayout>
    );
}