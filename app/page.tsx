import IndexProjects from "@/components/IndexProjects";
import IndexPlayground from "@/components/IndexPlayground";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-background">
      <IndexProjects />
      <IndexPlayground />
    </div>
  );
}
