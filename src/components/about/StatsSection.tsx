export function StatsSection(): React.ReactElement {
    const stats = [
        { label: 'Активных клиентов', value: '10 000+' },
        { label: 'Водителей', value: '2 500+' },
        { label: 'Поездок в месяц', value: '150 000+' },
    ];

    return (
        <section className="py-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
                TaxiService сегодня
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <p className="text-4xl font-bold text-gray-900">
                            {stat.value}
                        </p>
                        <p className="mt-2 text-gray-600">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
