import IndexProjects from "@/components/IndexProjects";
import IndexPlayground from "@/components/IndexPlayground";
import { getProjectSummaries } from "@/lib/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      <IndexProjects projects={getProjectSummaries()} />
      <IndexPlayground />
    </div>
  );
}
