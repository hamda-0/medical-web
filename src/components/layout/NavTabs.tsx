'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  //   navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { navigationLinks } from '@/constants/navigationLinks';

const NavTabs = () => {
  const pathname = usePathname();



  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  //   const isActiveDropdown = (items: { href: string; label: string }[]) => {
  //     return items.some(item => pathname === item.href);
  //   };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationLinks.map((navItem, index) => (
          <NavigationMenuItem key={index}>
            {navItem.type === 'link' ? (
              // <Link href={navItem.href!} passHref>
              <NavigationMenuLink href={navItem.href!}
                className={cn( "text-sm font-medium leading-none"
                )}
              >
                {navItem.label}
              </NavigationMenuLink>
              // </Link>
            ) : (
              <>
                <NavigationMenuTrigger className={cn( "text-sm font-medium leading-none"
                )}>
                  {navItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {navItem.items!.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.label}
                        href={item.href}
                                             >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(className)}
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

export default NavTabs;