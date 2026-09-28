import { Fragment } from "react";
import type { RichText as RichTextValue } from "@/lib/types";

/**
 * Renders RichText strings (see lib/types.ts):
 *   **like this** → highlighted span
 *   blank line    → paragraph break
 * A single paragraph renders inline (no <p>), so it can sit inside headings.
 */
export default function RichText({ text }: { text: RichTextValue }) {
  const paragraphs = text.split(/\n{2,}/);
  if (paragraphs.length === 1) return <>{renderInline(paragraphs[0])}</>;
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{renderInline(paragraph)}</p>
      ))}
    </>
  );
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className="text-text-action">
        {part.slice(2, -2)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
