import React from 'react';

export function HeroSection(): React.ReactElement {
    return (
        <section className="flex flex-col items-center text-center py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Такси в один клик
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-600">
                Быстрое и безопасное такси в вашем городе.
                Прозрачные цены, проверенные водители и удобный сервис.
            </p>

            <div className="mt-10 flex gap-4">
                <button className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition">
                    Заказать поездку
                </button>

                <button className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100 transition">
                    Стать водителем
                </button>
            </div>
        </section>
    );
}
