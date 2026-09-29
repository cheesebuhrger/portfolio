import type { Metadata } from "next";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Frames from "@/components/home/Frames";
import JsonLd from "@/components/seo/JsonLd";
import { getFrames, getProjectSummaries } from "@/lib/content";
import { homeJsonLd, shareMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  ...shareMetadata({ path: "/", title: SITE.title, description: SITE.description }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      <JsonLd data={homeJsonLd()} />
      <FeaturedProjects projects={getProjectSummaries()} />
      <Frames items={getFrames()} />
    </div>
  );
}
