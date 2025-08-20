// import { cn } from "@/lib/utils";

// export function ListUnordered({
//   className,
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
//       <li>{children}</li>
//     </ul>
//   );
// }

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <ul
      ref={ref}
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  </div>
));
UnorderedList.displayName = "UnorderedList";

const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <ol
      ref={ref}
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  </div>
));
OrderedList.displayName = "OrderedList";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "li";
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
ListItem.displayName = "ListItem";

export { UnorderedList, ListItem, OrderedList };
