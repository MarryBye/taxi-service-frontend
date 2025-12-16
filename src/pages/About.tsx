import React from 'react';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import {HeroSection} from "@/components/about/HeroAction";
import {MissionSection} from "@/components/about/MissionSection";
import {ValuesSection} from "@/components/about/ValuesSection";
import {StatsSection} from "@/components/about/StatsSection";

export default function AboutPage(): React.ReactElement {
    return (
        <DefaultLayout>
            <HeroSection />
            <MissionSection />
            <ValuesSection />
            <StatsSection />
        </DefaultLayout>
    );
}
