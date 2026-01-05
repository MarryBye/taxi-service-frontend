import React from "react";

import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import {useAuth} from "@/hooks/useAuth";
import LoginForm from "@/components/forms/authorized/LoginForm";
import RegisterForm from "@/components/forms/authorized/RegisterForm";
import MakeOrderForm from "@/components/forms/authorized/MakeOrderForm";
import UpdateProfileForm from "@/components/forms/authorized/UpdateProfile";
import type {LoginSchema, RegisterSchema} from "@/types/auth";
import type {MakeOrderSchema, UpdateProfile} from "@/types/authorized";
import ClientCancelOrderForm from "@/components/forms/authorized/CancelOrderForm";
import type {CancelOrderSchema as ClientCancelSchema} from "@/types/authorized";
import ClientRateOrderForm from "@/components/forms/authorized/RateOrderForm";
import type {RateOrderSchema as ClientRateSchema} from "@/types/authorized";
import WorkerRateOrderForm from "@/components/forms/workers/RateOrderForm";
import type {CancelOrderSchema as WorkerCancelSchema} from "@/types/workers";
import WorkerCancelOrderForm from "@/components/forms/workers/CancelOrderForm";
import type {RateOrderSchema as WorkerRateOrderSchema} from "@/types/workers";
import CreateUserForm from "@/components/forms/admin/CreateUserForm";
import type {
    CreateCarSchema,
    CreateMaintenanceSchema, CreateTransactionSchema, CreateUserSchema, UpdateCarSchema,
    UpdateMaintenanceSchema, UpdateUserSchema
} from "@/types/admin";
import UpdateUserForm from "@/components/forms/admin/UpdateUserForm";
import CreateTransactionForm from "@/components/forms/admin/CreateTransactionForm";
import CreateMaintenanceForm from "@/components/forms/admin/CreateMaintenanceForm";
import UpdateMaintenanceForm from "@/components/forms/admin/UpdateMaintenanceForm";
import CreateCarForm from "@/components/forms/admin/CreateCarForm";
import UpdateCarForm from "@/components/forms/admin/UpdateCarForm";

export default function HomePage(): React.ReactElement | null {
    const auth = useAuth();
    return (
        <DefaultLayout>
            <section className="flex flex-col max-w-7xl mx-auto px-8 py-20 items-center">
                <LoginForm
                    submitHandler={
                        (form: LoginSchema) => {
                            auth.login(form);
                        }
                    }
                />

                <RegisterForm
                    submitHandler={(form: RegisterSchema) => {
                        console.log("Submitted!")
                        console.table(form)
                    }}
                />

                <MakeOrderForm
                    submitHandler={(form: MakeOrderSchema) => {
                        console.log("Submitted!")
                        console.table(form)
                    }}
                />

                <UpdateProfileForm
                    submitHandler={
                        (form: UpdateProfile) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <ClientCancelOrderForm
                    submitHandler={(form: ClientCancelSchema) => {
                        console.log("Submitted!")
                        console.table(form)
                    }}
                />

                <ClientRateOrderForm
                    submitHandler={
                        (form: ClientRateSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
               />

                <WorkerRateOrderForm
                    submitHandler={
                        (form: WorkerRateOrderSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <WorkerCancelOrderForm
                    submitHandler={
                        (form: WorkerCancelSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <CreateUserForm
                    submitHandler={(form: CreateUserSchema) => {
                        console.log("Submitted!")
                        console.table(form)
                    }}
                />

                <UpdateUserForm
                    submitHandler={
                        (form: UpdateUserSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <CreateTransactionForm
                    submitHandler={
                        (form: CreateTransactionSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <CreateMaintenanceForm
                    submitHandler={
                        (form: CreateMaintenanceSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <UpdateMaintenanceForm
                    submitHandler={
                        (form: UpdateMaintenanceSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <CreateCarForm
                    submitHandler={
                        (form: CreateCarSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />

                <UpdateCarForm
                    submitHandler={
                        (form: UpdateCarSchema) => {
                            console.log("Submitted!")
                            console.table(form)
                        }
                    }
                />
            </section>

        </DefaultLayout>
    );
}
