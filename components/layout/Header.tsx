"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { CHURCH_INFO, NAV_LINKS, NavLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [openMobileMenu, setOpenMobileMenu] = React.useState<number | null>(null);

    const toggleMobileMenu = (index: number) => {
        setOpenMobileMenu((prev) => (prev === index ? null : index));
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary">
                        {CHURCH_INFO.name}
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {NAV_LINKS.map((link: NavLink) => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuTrigger className="text-sm font-medium">
                                        {link.name}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="flex flex-col min-w-[160px] p-1">
                                            {link.children.map((child) => (
                                                <li key={child.href}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={child.href}
                                                            className="block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Button size="sm" asChild>
                        <Link href="/login">성도 로그인</Link>
                    </Button>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setOpenMobileMenu(null); }}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">{CHURCH_INFO.name}</SheetTitle>
                            </SheetHeader>
                            <nav className="mt-8 flex flex-col">
                                {NAV_LINKS.map((link: NavLink, index: number) => (
                                    <div key={link.href} className="border-b last:border-b-0">
                                        <button
                                            onClick={() => toggleMobileMenu(index)}
                                            className="flex items-center justify-between w-full py-3 text-base font-medium transition-colors hover:text-primary"
                                        >
                                            <span>{link.name}</span>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 text-muted-foreground transition-transform",
                                                    openMobileMenu === index && "rotate-180"
                                                )}
                                            />
                                        </button>
                                        {openMobileMenu === index && (
                                            <ul className="pb-2 pl-2 flex flex-col gap-1">
                                                {link.children.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="block py-1.5 px-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-sm"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                                <div className="mt-4 pt-4 border-t">
                                    <Button className="w-full" asChild>
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            로그인
                                        </Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
