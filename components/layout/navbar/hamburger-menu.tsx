import React from "react"; 
import { AlignJustify } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MenuItems from "@/data/menu.json";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggler";
import ContactBanner from "./contact-banner";
// import ContactBanner from "./contact-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HamburgerMenu() {
  return (
    <>
      <div className="md:hidden my-auto">
        <Sheet>
          <SheetTrigger>
            <AlignJustify className="h-8 w-8 my-auto" />
            <span className="sr-only">Close</span>
          </SheetTrigger>
          <SheetTitle className="sr-only">Menu Button</SheetTitle>
          <SheetContent className="w-full">
            <ModeToggle />
            <NavigationMenu className="mt-20 mx-auto">
              <NavigationMenuList className="flex flex-col">
                {MenuItems.menu.mainmenu.map((item) => {
                  if (!item.children)
                    return (
                      <NavigationMenuItem key={item.id} className="my-5">
                        <NavigationMenuLink asChild>
                          <Link 
                            href={item.href} 
                            title={item.title}
                            className={navigationMenuTriggerStyle()}
                          >
                            <SheetTrigger className="uppercase">{item.title}</SheetTrigger>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  
                  return (
                    <NavigationMenuItem key={item.id} className="my-5">
                      <Accordion type="single" key={item.id} collapsible>
                        <AccordionItem value="item-1" className="border-b-0">
                          <AccordionTrigger className="justify-center hover:no-underline uppercase">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            {item.children.map((childItem) => (
                              childItem.href ? (
                                <ListItem
                                  key={childItem.title}
                                  title={childItem.title}
                                  href={childItem.href}
                                />
                              ) : null
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      {/* <NavigationMenuContent></NavigationMenuContent> */}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            <ContactBanner />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (

      <NavigationMenuLink asChild>
        <SheetTrigger asChild>
          <Link
            href={href}
            ref={ref}
            className={cn(
              "block w-full px-20 py-3 select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            title={title}
            {...props}
          >
            <div className="text-sm w-44 font-medium leading-none text-center uppercase">
              {title}
            </div>

            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground uppercase ">
              {children}
            </p>
          </Link>
        </SheetTrigger>
      </NavigationMenuLink>

  );
});
ListItem.displayName = "ListItem";
