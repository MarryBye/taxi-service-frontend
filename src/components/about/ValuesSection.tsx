export function ValuesSection(): React.ReactElement {
    const values = [
        {
            title: 'Безопасность',
            text: 'Проверенные водители, рейтинги и прозрачные правила.',
        },
        {
            title: 'Комфорт',
            text: 'Удобный сервис и понятный процесс заказа.',
        },
        {
            title: 'Честность',
            text: 'Прозрачные цены без скрытых комиссий.',
        },
    ];

    return (
        <section className="py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Наши ценности
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {values.map((value) => (
                    <div
                        key={value.title}
                        className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            {value.title}
                        </h3>
                        <p className="mt-3 text-gray-600">
                            {value.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
