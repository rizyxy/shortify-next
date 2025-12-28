"use server";

import { Button } from "@/components/ui/button";
import { showLink } from "@/lib/actions/link/show-link";
import Link from "next/link";

export default async function PortalPage({
  params,
}: {
  params: { shorturl: string };
}) {
  const { shorturl } = await params;

  const url = await showLink(shorturl);

  return (
    <main className="px-8 py-5 h-100 flex flex-col gap-5 items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl font-bold">You are about to enter</h1>
        <p className="text-lg">{url}</p>
      </div>
      <Button variant={"default"}>
        <Link href={url}>Proceed</Link>
      </Button>
    </main>
  );
}
