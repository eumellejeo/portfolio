import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorkSection } from '@/components/sections/WorkSection';

export default function HomePage() {
  return (
    <>
      <FloatingNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
      </main>
      <FooterSection />
    </>
  );
}
