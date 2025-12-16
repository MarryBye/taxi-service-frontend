import React from 'react';

export function CallToActionSection(): React.ReactElement {
    return (
        <section className="py-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
                Готовы начать?
            </h2>

            <p className="mt-4 text-gray-600">
                Зарегистрируйтесь и закажите первую поездку уже сегодня
            </p>

            <button className="mt-8 rounded-xl bg-yellow-400 px-8 py-4 font-semibold text-black hover:bg-yellow-300 transition">
                Зарегистрироваться
            </button>
        </section>
    );
}
