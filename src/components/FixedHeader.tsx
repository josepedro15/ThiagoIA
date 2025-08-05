import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';

export const FixedHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    // Track lead event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'Lead', {
        event_category: 'engagement',
        event_label: 'fixed_header_cta'
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    
    // Redirect to Kiwify checkout
    window.open('https://pay.kiwify.com.br/ky5ZU3k', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">ClinicaIA</span>
            <Timer className="text-red-500" />
          </div>
          <Button 
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Quero economizar agora
          </Button>
        </div>
      </div>
    </div>
  );
};