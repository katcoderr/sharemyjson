import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <div className="flex gap-4">
            <Link href="/" className="flex items-center gap-2">
            <ExternalLink className="h-6 w-6"/>
            <span className="font-bold">sharemyjson.</span>
            </Link>
            <nav>
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground translate-colors hover:text-foreground">
                Dashboard
                </Link>
            </nav>
        </div>
        <Button variant="outline">Sign In</Button>
      </div>
    </div>
  );
};

export default Navbar;
