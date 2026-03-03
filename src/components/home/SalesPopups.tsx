import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const POPUP_MESSAGES = [
    {
        text: "Dr. Carlos (SP) acabou de assinar o plano Anual.",
        icon: "💳"
    },
    {
        text: "12 médicos estão visualizando os planos agora.",
        icon: "🔥"
    },
    {
        text: "Faltam apenas 24 horas para este valor expirar.",
        icon: "⏳"
    },
    {
        text: "Últimas 3 licenças com valor promocional disponíveis.",
        icon: "⏰"
    },
    {
        text: "Dra. Fernanda (RJ) economizou R$ 850 em visita técnica hoje.",
        icon: "💰"
    },
    {
        text: "Apenas 1 vaga restante para a consultoria bônus de setup.",
        icon: "🎁"
    }
];

export const SalesPopups = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Only run on the client
        if (typeof window === 'undefined') return;

        // Configuration for the intervals (Slower)
        const INITIAL_DELAY = 5000; // 5 seconds before first popup
        const POPUP_INTERVAL_MIN = 15000; // 15 seconds min between popups
        const POPUP_INTERVAL_MAX = 35000; // 35 seconds max

        let timeoutId: NodeJS.Timeout;

        const showNextPopup = () => {
            const message = POPUP_MESSAGES[currentIndex % POPUP_MESSAGES.length];

            toast(message.text, {
                icon: message.icon,
                position: 'bottom-left',
                duration: 6000,
                className: 'bg-[#101622] border-2 border-[#ccfb4b] text-white shadow-brutalist rounded-none font-medium text-[15px]',
            });

            setCurrentIndex((prev) => prev + 1);

            // Schedule the next popup with a random interval to seem more organic
            const nextDelay = Math.random() * (POPUP_INTERVAL_MAX - POPUP_INTERVAL_MIN) + POPUP_INTERVAL_MIN;
            timeoutId = setTimeout(showNextPopup, nextDelay);
        };

        // Start the sequence
        timeoutId = setTimeout(showNextPopup, INITIAL_DELAY);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentIndex]);

    // Render nothing visible in the DOM directly, it just controls toasts
    return null;
};
