import React from 'react';

import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

export default function HomePage(): React.ReactElement {
    return (
        <DefaultLayout>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CallToActionSection />
        </DefaultLayout>
    );
}
