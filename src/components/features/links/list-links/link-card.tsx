import Link from "@/lib/types/link";
import { DeleteLinkForm } from "../delete-link/delete-link-form";

export function LinkCard({ link }: { link: Link }) {
  return (
    <div className="p-5 border border-gray-300 rounded flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold">{link.shortUrl}</h2>
        <p className="text-sm text-gray-500">{link.url}</p>
      </div>
      <DeleteLinkForm linkId={link.id} />
    </div>
  );
}
