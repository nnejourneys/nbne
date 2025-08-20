import { cn } from "@/lib/utils";

type PProps = {
  children: React.ReactNode;
  className?: string;
};
export function P({ children, className, ...props }: PProps) {
  return (
    <p className={cn("leading-7 pb-1", className)} {...props}>
      {children}
    </p>
  );
}
