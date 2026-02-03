"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CHURCH_INFO, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);

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
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="transition-colors hover:text-primary text-muted-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button size="sm" asChild>
                        <Link href="/login">성도 로그인</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                            <nav className="mt-8 flex flex-col gap-4">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
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
