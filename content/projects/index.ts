import type { Project } from "@/lib/types";
import buildforceLeadership from "./buildforce-leadership";
import buildforce from "./buildforce";
import stravaGrowth from "./strava-growth";

/** Case studies in display order (homepage order, and "Explore more" order). */
const projects: Project[] = [buildforceLeadership, buildforce, stravaGrowth];

export default projects;
