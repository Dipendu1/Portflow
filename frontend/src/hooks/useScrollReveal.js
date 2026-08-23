import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(node); // animate once, not every scroll
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -80px 0px",
                ...options
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
}