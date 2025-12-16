import React from 'react';
import { FooterBrand } from './FooterBrand';
import { FooterNav } from './FooterNav';
import { FooterSocial } from './FooterSocial';
import { FooterBottom } from './FooterBottom';

export function FooterElement(): React.ReactElement {
    return (
        <footer className="mt-16 w-full border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <FooterBrand />
                    <FooterNav />
                    <FooterSocial />
                </div>
            </div>

            <FooterBottom />
        </footer>
    );
}
