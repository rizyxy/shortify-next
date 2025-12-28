"use client";

import { Button } from "@/components/ui/button";
import deleteLink from "@/lib/actions/link/delete-link";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function DeleteLinkForm({ linkId }: { linkId: string }) {
  const [state, formAction, isPending] = useActionState(deleteLink, {
    message: null,
  });

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state.message]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={linkId} readOnly />
      <Button
        className="self-end hover:cursor-pointer hover:opacity-80"
        variant={"destructive"}
        type="submit"
        disabled={isPending}
      >
        {isPending ? <LucideLoaderCircle className="animate-spin" /> : "Delete"}
      </Button>
    </form>
  );
}
