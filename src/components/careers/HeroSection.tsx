import React from 'react';

export function HeroSection(): React.ReactElement {
    return (
        <section className="py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Карьера в TaxiService
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
                Присоединяйтесь к нашей команде и станьте частью сервиса,
                который ежедневно помогает тысячам людей быстро и безопасно
                добираться до места назначения.
            </p>
        </section>
    );
}
