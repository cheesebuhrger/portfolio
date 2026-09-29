import { Fragment } from "react";
import type { RichText as RichTextValue } from "@/lib/types";

/**
 * Renders RichText strings (see lib/types.ts):
 *   **like this** → highlighted span
 *   blank line    → paragraph break
 *
 * Most slots (headlines, quotes, captions, stat titles) are already inside a
 * <p> or heading, where a nested <p> is invalid HTML. So by default
 * paragraphs are separated with two line breaks. Pass `blocks` only where the
 * container can hold paragraphs (e.g. a <div>) to get real <p> elements.
 */
export default function RichText({
  text,
  blocks = false,
}: {
  text: RichTextValue;
  blocks?: boolean;
}) {
  const paragraphs = text.split(/\n{2,}/);
  if (paragraphs.length === 1) return <>{renderInline(paragraphs[0])}</>;
  if (blocks) {
    return (
      <>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{renderInline(paragraph)}</p>
        ))}
      </>
    );
  }
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              <br />
              <br />
            </>
          )}
          {renderInline(paragraph)}
        </Fragment>
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
