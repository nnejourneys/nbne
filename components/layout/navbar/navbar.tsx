"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MenuItems from "@/data/menu.json";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggler";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col md:flex-row me-2">
        {MenuItems.menu.mainmenu.map((item) => {
          if (!item.children)
            return (
              <NavigationMenuItem key={item.id} className="bg-transparent">
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent uppercase"
                    )}
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          
          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className="uppercase" title={item.title}>
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-72">
                  {item.children.map((childItem) => (
                    childItem.href ? (
                      <ListItem
                        className="uppercase"
                        key={childItem.title}
                        title={childItem.title}
                        href={childItem.href}
                      />
                    ) : null
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <ModeToggle />
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          title={title}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
     
  );
});
ListItem.displayName = "ListItem";