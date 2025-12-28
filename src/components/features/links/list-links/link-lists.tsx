"use client";

import Link from "@/lib/types/link";
import { useState } from "react";
import { LinkCard } from "./link-card";

export function LinkLists({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  if (links.length === 0) {
    return (
      <section className="py-20">
        <p className="text-center">You haven't shorten any URL</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </section>
  );
}
