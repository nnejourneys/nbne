"use client"
import { useEffect, useRef, useState } from "react";

export default function StaggeredListItem({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const staggerDelay = index * 150; // 150ms delay between each item

  return (
    <>
      <li
        ref={itemRef}
        className={`staggeritem flex transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: isVisible ? `${staggerDelay}ms` : '0ms'
        }}
      >
        {children}
      </li>
    </>
  );
}
