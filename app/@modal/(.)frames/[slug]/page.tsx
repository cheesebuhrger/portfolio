import { notFound } from "next/navigation";
import FrameDetail from "@/components/frames/FrameDetail";
import { getFrame, getFrames } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFrames().map((item) => ({ slug: item.slug }));
}

export default async function FrameModalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getFrame((await params).slug);
  if (!item) notFound();
  return <FrameDetail item={item} />;
}
