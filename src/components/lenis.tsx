'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function LenisScroll() {
    const location = useLocation();
    const isCustomerPage = location.pathname.startsWith('/customer');

    useEffect(() => {
        // Disable Lenis on customer pages to allow native scrolling
        if (isCustomerPage) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            anchors: {
                offset: -100,
            },
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isCustomerPage]);

    return null;
}