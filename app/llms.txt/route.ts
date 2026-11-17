import { getFrames, getProjects, frameDescription } from "@/lib/content";
import { llmsTxt } from "@/lib/seo";

/** /llms.txt, built once at build time like the sitemap. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(getProjects(), getFrames(), frameDescription), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
