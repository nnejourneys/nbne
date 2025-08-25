"use client"
import { useEffect, useRef, useState } from "react";

export default function StaggeredList({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ul
        ref={listRef}
        className={`grid md:grid-cols-2 gap-4 transition-all duration-1000 delay-500 ease-in-out ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-100 scale-50'
        }`}
      >
        {children}
      </ul>
    </>
  );
}
