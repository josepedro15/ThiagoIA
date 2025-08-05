import { useState, useEffect } from 'react';

export const LicenseCounter = () => {
  const [licensesLeft, setLicensesLeft] = useState(300);

  useEffect(() => {
    // Simulate licenses being purchased
    const interval = setInterval(() => {
      setLicensesLeft(prev => {
        const decrease = Math.floor(Math.random() * 3) + 1; // Random decrease 1-3
        const newValue = prev - decrease;
        return newValue < 50 ? 50 : newValue; // Don't go below 50
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
      <div className="text-center">
        <p className="text-sm text-red-400 mb-1">🔥 Licenças Restantes</p>
        <p className="text-2xl font-bold text-red-500">{licensesLeft}</p>
        <p className="text-xs text-red-400">de 500 disponíveis hoje</p>
      </div>
    </div>
  );
};