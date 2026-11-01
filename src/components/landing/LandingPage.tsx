import React from 'react';
import { HeroSection } from './HeroSection';
import { SDGImpactSection } from './SDGImpactSection';
import { FeaturesSection } from './FeaturesSection';
import { VivaDemoCallout } from './VivaDemoCallout';
import { UserProfile } from '../../types/nutrition';

interface LandingPageProps {
  onStartAssessment: () => void;
  onSelectDemoProfile: (profile: UserProfile) => void;
  onOpenVivaDefense: () => void;
  hasActiveProfile?: boolean;
  activeProfileName?: string;
  onScrollToHowItWorks?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onSelectDemoProfile,
  onOpenVivaDefense,
  hasActiveProfile,
  activeProfileName,
  onScrollToHowItWorks,
}) => {
  const scrollToSDG = () => {
    const el = document.getElementById('sdg-impact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    if (onScrollToHowItWorks) {
      onScrollToHowItWorks();
      return;
    }
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <HeroSection 
        onStartAssessment={onStartAssessment} 
        onScrollToHowItWorks={scrollToHowItWorks}
        onScrollToSDG={scrollToSDG}
        onOpenVivaDefense={onOpenVivaDefense}
        hasActiveProfile={hasActiveProfile}
        activeProfileName={activeProfileName}
      />
      <SDGImpactSection />
      <FeaturesSection />
      <VivaDemoCallout 
        onSelectDemoProfile={onSelectDemoProfile}
        onStartAssessment={onStartAssessment}
        onOpenVivaDefense={onOpenVivaDefense}
      />
    </div>
  );
};
