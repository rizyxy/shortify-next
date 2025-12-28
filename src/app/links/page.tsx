"use server";

import { LinkLists } from "@/components/features/links/list-links/link-lists";
import { Button } from "@/components/ui/button";
import { getLinks } from "@/lib/actions/link/get-link";
import Link from "next/link";

export default async function LinksPage() {
  const initialLinks = await getLinks();

  return (
    <main className="px-8 py-5 flex flex-col gap-5">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold">All Links</h1>
        <Button>
          <Link href={"/links/create"}>Shorten URL</Link>
        </Button>
      </div>
      <LinkLists initialLinks={initialLinks} />
    </main>
  );
}
