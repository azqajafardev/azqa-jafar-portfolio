import type { Project } from "../data/portfolio";
import { ProjectSystem } from "./systems/project-system";
export function Architecture({ index }: { project: Project; index: number }) {
  return <ProjectSystem index={index} />;
}
