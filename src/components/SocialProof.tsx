import { useState, useEffect } from 'react';

const notifications = [
  "Dr. Paula ativou há 2 min",
  "Clínica São José adquiriu há 5 min", 
  "Dr. Carlos economizou R$ 2.300 este mês",
  "Dra. Ana reduziu cancelamentos em 85%",
  "Centro Médico Plus ativou há 1 min",
  "Dr. Roberto automatizou 450 agendamentos"
];

export const SocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification(prev => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs">
      <div className={`bg-card border border-border rounded-lg p-3 shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <p className="text-sm text-card-foreground">
            {notifications[currentNotification]}
          </p>
        </div>
      </div>
    </div>
  );
};