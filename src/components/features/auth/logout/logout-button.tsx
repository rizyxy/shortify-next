"use client";

import { Button } from "@/components/ui/button";
import logout from "@/lib/actions/auth/logout";
import { LucideLoaderCircle } from "lucide-react";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form className="w-full flex" action={() => startTransition(logout)}>
      <Button
        className="w-full hover:opacity-75 cursor-pointer"
        type="submit"
        variant="destructive"
        disabled={isPending}
      >
        {isPending ? <LucideLoaderCircle className="animate-spin" /> : "Logout"}
      </Button>
    </form>
  );
}
