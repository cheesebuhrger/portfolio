import { notFound } from "next/navigation";
import PlaygroundDetail from "@/components/playground/PlaygroundDetail";
import { getPlaygroundItem, getPlaygroundItems } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlaygroundItems().map((item) => ({ slug: item.slug }));
}

export default async function PlaygroundModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getPlaygroundItem((await params).slug);
  if (!item) notFound();
  return <PlaygroundDetail item={item} />;
}
