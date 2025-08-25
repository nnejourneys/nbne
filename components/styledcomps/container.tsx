"use client";
import { useRef, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import React from "react";

// Custom hook to replace framer-motion useInView
const useIntersectionObserver = (
  ref: React.RefObject<Element | null>, 
  options: IntersectionObserverInit & { once?: boolean } = {}
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const { once, ...observerOptions } = options;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        }
      },
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
};

const containerVariants = cva(" ", {
  variants: {
    variant: {
      default: "p-1",
      light: "text-black bg-white",
      dark: "text-white bg-black",
    },
    width: {
      marginxy:
        "sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-2 md:px-0 mx-auto my-28",
      marginx:
        "sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-2 md:px-0 mx-auto",
      marginy: "w-full my-28",
      nomargin: "w-full",
    },
    animate: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    width: "marginxy",
    animate: true,
  },
});

export interface ContainerProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      className,
      variant,
      width,
      animate = true,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const internalRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const isInView = useIntersectionObserver(internalRef, { once: true });
    
    useEffect(() => {
      setMounted(true);
    }, []);

    const content = animate && mounted ? (
      <div
        className={`transition-all duration-700 delay-500 ease-container-animation ${
          isInView 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-[200px] opacity-0'
        }`}
        ref={ref}
      >
        {children}
      </div>
    ) : (
      <div ref={ref}>
        {children}
      </div>
    );

    return (
      <Comp
        className={cn(
          containerVariants({ variant, width, animate, className })
        )}
        ref={internalRef}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
