import React from 'react';

export function RolesSection(): React.ReactElement {
    const roles = [
        {
            title: 'Водитель',
            text: 'Идеально для тех, кто хочет стабильный доход и гибкий график.',
        },
        {
            title: 'Диспетчер',
            text: 'Помогайте координировать заказы и поддерживать клиентов.',
        },
        {
            title: 'Технический специалист',
            text: 'Развивайте и поддерживайте нашу платформу.',
        },
    ];

    return (
        <section className="py-20 bg-gray-50 rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Открытые направления
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {roles.map((role) => (
                    <div
                        key={role.title}
                        className="rounded-2xl bg-white p-6 shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            {role.title}
                        </h3>
                        <p className="mt-3 text-gray-600">{role.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
