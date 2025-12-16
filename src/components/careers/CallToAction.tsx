import React from 'react';
import {Button} from "@/components/ui/Button/Button";

export function CallToActionSection(): React.ReactElement {
    return (
        <section className="py-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
                Готовы начать?
            </h2>

            <p className="mt-4 text-gray-600">
                Оставьте заявку и мы свяжемся с вами в ближайшее время
            </p>

            <div className="mt-8 flex justify-center">
                <Button className="px-10">
                    Стать частью команды
                </Button>
            </div>
        </section>
    );
}
