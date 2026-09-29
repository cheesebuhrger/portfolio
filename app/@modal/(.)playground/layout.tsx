import PlaygroundDialog from "@/components/playground/PlaygroundDialog";
import { getPlaygroundItems } from "@/lib/content";

// Intercepts /playground/{slug} when navigating inside the site and shows it
// as a dialog over the current page. The dialog lives in this layout so it
// persists while Previous/Next change the slug below it.
export default function PlaygroundModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = getPlaygroundItems().map(({ slug, title }) => ({ slug, title }));
  return <PlaygroundDialog items={items}>{children}</PlaygroundDialog>;
}
