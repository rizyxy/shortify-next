import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideMenu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="p-5">
        <NavigationMenu className="max-w-full w-full justify-start contents">
          <NavigationMenuList className=" w-full flex justify-between items-center list-none">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="font-bold text-xl">
                Shortify
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger>
                  <LucideMenu />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-lg">Menu</SheetTitle>
                  </SheetHeader>
                  <SheetFooter>
                    <Button variant="default">
                      <Link href={"/auth/login"}>Login</Link>
                    </Button>
                    <Button variant="secondary">
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
