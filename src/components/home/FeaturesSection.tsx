import React from 'react';

const features = [
    { title: 'Быстро', text: 'Машина рядом с вами за считанные минуты' },
    { title: 'Безопасно', text: 'Проверенные водители и рейтинги' },
    { title: 'Прозрачно', text: 'Фиксированная цена без сюрпризов' },
];

export function FeaturesSection(): React.ReactElement {
    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Почему выбирают нас
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            {f.title}
                        </h3>
                        <p className="mt-3 text-gray-600">{f.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
