import React from 'react';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { HeroSection } from "@/components/careers/HeroSection";
import { WhyUsSection } from "@/components/careers/WhyUsSection";
import { RolesSection } from "@/components/careers/RolesSection";
import { CallToActionSection } from "@/components/careers/CallToAction";

export default function CareersPage(): React.ReactElement {
    return (
        <DefaultLayout>
            <HeroSection />
            <WhyUsSection />
            <RolesSection />
            <CallToActionSection />
        </DefaultLayout>
    );
}
