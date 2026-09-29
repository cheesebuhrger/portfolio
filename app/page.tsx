import FeaturedProjects from "@/components/home/FeaturedProjects";
import Playground from "@/components/home/Playground";
import { getPlaygroundItems, getProjectSummaries } from "@/lib/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      <FeaturedProjects projects={getProjectSummaries()} />
      <Playground items={getPlaygroundItems()} />
    </div>
  );
}
