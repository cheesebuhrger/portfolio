import FrameDialog from "@/components/frames/FrameDialog";
import { getFrames } from "@/lib/content";

// Intercepts /frames/{slug} when navigating inside the site and shows it
// as a dialog over the current page. The dialog lives in this layout so it
// persists while Previous/Next change the slug below it.
export default function FramesModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = getFrames().map(({ slug, title }) => ({ slug, title }));
  return <FrameDialog items={items}>{children}</FrameDialog>;
}
