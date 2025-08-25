"use client"
import { useEffect, useRef, useState } from "react";

export default function StaggeredListItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <li 
        ref={itemRef}
        className={`staggeritem flex transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-10'
        }`}
      >
        {children}
      </li>
    </>
  );
}
