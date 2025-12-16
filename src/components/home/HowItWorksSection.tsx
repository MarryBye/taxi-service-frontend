import React from 'react';

const steps = [
    'Выберите маршрут',
    'Подтвердите заказ',
    'Водитель уже едет к вам',
    'Наслаждайтесь поездкой',
];

export function HowItWorksSection(): React.ReactElement {
    return (
        <section className="py-20 bg-gray-50 rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Как это работает
            </h2>

            <ol className="mt-10 grid gap-6 md:grid-cols-4">
                {steps.map((step, index) => (
                    <li
                        key={step}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
                            {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
