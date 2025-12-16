import React from 'react';

export function WhyUsSection(): React.ReactElement {
    const items = [
        {
            title: 'Гибкий график',
            text: 'Работайте тогда, когда вам удобно — полный или частичный день.',
        },
        {
            title: 'Честные выплаты',
            text: 'Прозрачная система начислений без скрытых комиссий.',
        },
        {
            title: 'Поддержка 24/7',
            text: 'Мы всегда рядом и готовы помочь водителям и сотрудникам.',
        },
    ];

    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Почему стоит выбрать нас
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            {item.title}
                        </h3>
                        <p className="mt-3 text-gray-600">{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
